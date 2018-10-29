'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var stringEx = require('@kingjs/string-ex');
var assert = require('@kingjs/assert');

var transform = require('@kingjs/descriptor.family.transform');
var Node = require('./node');  

function defineBase(func, base) {
  assert(is.function(func));
  assert(is.function(base));
  
  func.prototype = Object.create(base.prototype);
  objectEx.setHiddenProperty(func.prototype, 'constructor', func);
  return func;
}

/**
 * Data structure is a tree where each node 
 *  (a) is a type derived from Node. Node itself should be considered abstract.
 *  (b) is a "lexical scope" meaning it has:
 *    (1) parent: optional, only the root is without a parent. Can be accessed
 *          indirectly, filtered by type, via `getAncestor`. 
 *    (2) name: name which resolves node given its parent
 *    (3) fullName: the dot delimited concatenation of a node's 
 *          ancestor's names plus the node name.
 *    (4) _: a descriptor of 'private' data available to properties, 
 *          accessors, and methods attached to the node prototype.
 *    (5) children_: a descriptor of named child nodes accessed directly,
 *          filtered by type, via `children` and `getChild` or indirectly 
 *          via `getChild` via a fullName. 
 * 
 * Each node can `resolve` by dot delimited name other nodes. `resolve` works
 * like `getChild` except if nothing is found it tries again on the parent until
 * a node is found or there are no more parents.
 * 
 * To assist in creating Node derivations, there is the following language:
 * 
 *  nodeInfoDeclaration: { 
 *    methods: {
 *      func:
 *    },
 *    accessors: {
 *      func:
 *      type: 
 *      get: 
 *      ancestor:
 *      ref:
 *      lazy:
 *      defaultValue:
 *    }
 *  }
 *  
 * Each derivation of Node has a nodeInfo property on its constructor function
 * which contains metadata describing aspects of the node's properties and children.
 * 
 *  nodeInfo: {
 *    name: string // The name of the constructor
 *    wrap: string
 *    thunks:
 *    defaults:
 *    methods: // from nodeInfoDeclaration
 *    accessors: // from nodeInfoDeclaration
 * 
 *    children: {
 *      [name]: { // this is childInfo
 *        name:
 *        func:
 *        ...defaults...
 *      }
 *    }
 *  }
 * 
 * Maps nicely to graphs of reflection objects like Type, Property, and Module.
 * Specifically, each of those types derives from Node and has name child accessors
 * created like GetMethod and Methods.
 */

function flagsToAccessor(flags) {
  if (!flags)
    return null;
    
  return transform(flags, { 
    wrap: (x) => is.boolean(x) ? { defaultValue: x } : { get: x },
    defaults: { func: Boolean }
  })
}

function defineMethod(target, name, descriptor) {
  objectEx.defineFunction(target, name, descriptor.func);
}

function defineAccessor(target, name, descriptor) {
  var type = descriptor.func;
  var get = descriptor.get;
  var ancestor = descriptor.ancestor;
  var ref = descriptor.ref;
  var lazy = descriptor.lazy;
  var defaultValue = descriptor.defaultValue;
  
  // per Object.defineProperty convention, prefix predicates with 'is'
  if (type == Boolean)
    name = 'is' + capitalize(name);

  var value = defaultValue || ref || ancestor;
  
  // define
  objectEx.defineAccessor(target, name, function() {

    if (get && (!lazy || value === undefined))      
      value = get.call(this);

    if ((ref || ancestor) && is.string(value))
      value = this.resolve(value, type);

    if (ancestor && value === undefined)
      value = this.getAncestor(value);
    
    if (is.undefined(value))
      value = defaultValue;
    
    return value;
  });          
}

function defineNodes(target, nodeDescriptors) {
  transform.call(nodeDescriptors, {
    defaults: { 
      base: Node
    },
    depends: {
      base: function(value) { 
        return value.func; 
      }
    },
    refs: {
      children: { '*': { func: x => x.func } },
      accessors: { '*': { func: x => x.func } },
    },
    callback: function firstPass(name, descriptor) {
      
      // declare func as derivation of base
      var base = descriptor.base;
      var func = defineBase(function() {
        base.apply(this, arguments); 
      }, base);
      
      // default predicates
      objectEx.defineHiddenConstProperty(
        func.prototype, 
        'is' + stringEx.capitalize(name), 
        true
      );      

      // add methods to func prototype
      if (descriptor.methods) {
        var methods = transform.call(descriptor.methods, { wrap: 'func' });
        transform.call(methods, (n, d) => defineMethod(func.prototype, n, d));
      }

      // add field accessors to func prototype
      if (descriptor.accessors) {

        // flags are accessors with the boolean boilerplate removed
        var accessors = transform.call([
          descriptor.accessors,
          flagsToAccessor(descriptor.flags)
        ], { wrap: 'func' }); 

        transform.call(accessors, (n, d) => defineAccessor(func.prototype, n, d));
      }
      
      // add nodeInfo to func
      func.nodeInfo = {
        name: name,
        wrap: descriptor.wrap,
        thunks: descriptor.thunks,
        defaults: descriptor.defaults,
      };
      
      objectEx.defineFunction(target, name, func);

      return {
        func: func,
        name: descriptor.name,
        children: descriptor.children
      };
    }
  });

  return target;
}

function secondPass(name, nodeDescriptor) {      
  var func = nodeDescriptor.func;

  // define 'getFoo(name)' and 'foos()'
  var defineGetMethods = function(target, childFunc) {
    var childName = childFunc.nodeInfo.name;
    var pluralName = decapitalize(pluralOf(childName));
    var singularName = 'get' + childName;
    
    if (pluralName in target)
      return;
    
    defineConstHiddenProperty(target, pluralName, bind1st(Node.prototype.children, childFunc));
    defineConstHiddenProperty(target, singularName, bind2nd(Node.prototype.getChild, childFunc));
  };
  
  // define get methods up the child hierarchy; `getBaseFoo(name)` and 'baseFoos()'
  var defineAllGetMethods = function(target, childFunc) {
    defineGetMethods(target, childFunc);
    
    var baseChildCtor = Object.getPrototypeOf(childFunc.prototype).constructor;
    if (baseChildCtor == Node)
      return;
    
    // recurse
    defineAllGetMethods(target, baseChildCtor);
  }      
  
  // add child/children accessors to prototype
  var children = func.nodeInfo.children = 
    mapDescriptor({ wrap: 'func' }, nodeDescriptor.children) || emptyArray;
  for (var childrenName in children) {
    var target = func.prototype;

    // define; `defineMethod(name, descriptor)' and `defineMethods(descriptor)`
    var childInfo = children[childrenName];
    var defineChildrenName = 'define' + capitalize(childrenName);
    defineConstHiddenProperty(target, defineChildrenName, bind1st(Node.prototype.defineChildren, childInfo));
    defineConstHiddenProperty(target, singularOf(defineChildrenName), bind1st(Node.prototype.defineChild, childInfo));
    
    // reflect; `getMethod(name)' and `methods()`
    var childFunc = childInfo.func;
    forEachBase(function(baseChildFunc) {         
      var childBaseName = baseChildFunc.nodeInfo.name;
      var getBaseChildrenName = decapitalize(pluralOf(childBaseName));
      var getBaseChildName = 'get' + childBaseName;
      
      if (getBaseChildrenName in target)
        return;
      
      defineConstHiddenProperty(target, getBaseChildrenName, bind1st(Node.prototype.children, baseChildFunc));
      defineConstHiddenProperty(target, getBaseChildName, bind2nd(Node.prototype.getChild, baseChildFunc));          
    }, childFunc, Node);
  }
  
  return nodeDescriptor;
}

Object.defineProperties(module, {
  exports: { value: defineNodes }
});