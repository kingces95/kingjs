'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var stringEx = require('@kingjs/string-ex');
var assert = require('@kingjs/assert');

var create = require('@kingjs/descriptor.named.create');
var Node = require('./node');  

function defineBase(func, base) {
  assert(is.function(func));
  assert(is.function(base));
  
  func.prototype = Object.create(base.prototype);
  objectEx.setHiddenProperty(func.prototype, 'constructor', func);
  return func;
}

/**
 * Each node in the tree has a name and a type. The concatenated names from the 
 * root to any node is the node's path. Users are expected to construct trees with unique paths.
 * Nodes can be "resolved" by their paths. A node can "point" at another node by assigning 
 * the other node's path to one of it's properties. Such pointers are marked as either a
 * "dependency" or a "reference". Dependencies must form a poset and will be resolved
 * automatically before a node is resolved for the first time. After a node's dependencies
 * are resolved for the first time the node's "OnLoading" callback is invoked. The node
 * can do work knowing it's dependencies have been resolved but OnLoading must not attempt
 * to access any of it's references least it result in a loading cycle. After OnLoading finishes,
 * children of the node marked as "LoadOnParentLoad" are loaded automatically. 
 */

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
    
  return create(flags, { 
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

  var value = defaultValue || ref;
  
  // define
  objectEx.defineAccessor(target, name, function() {

    if (get && (!lazy || is.undefined(value)))      
      value = get.call(this);

    if (ref && is.string(value))
      value = this.resolve(value, type);

    if (ancestor && is.undefined(value)) {
      if (is.function(ancestor))
        ancestor = ancestor();
      value = this.getAncestor(ancestor);
    }
    
    if (is.undefined(value))
      value = defaultValue;
    
    return value;
  });          
}

function defineNodes(target, descriptors) {

  // declare type and type metadata
  descriptors = firstPass(descriptors);

  // declare methods dependent on type metadata
  descriptors = secondPass(descriptors);

  // publish
  for (var name in descriptors)          
    objectEx.defineFunction(target, name, descriptors[name].func);
  return target;
}

function firstPass(descriptors) {
  return create.call(descriptors, {
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
        var methods = create.call(descriptor.methods, { wrap: 'func' });
        create.call(methods, (n, d) => defineMethod(func.prototype, n, d));
      }

      // add field accessors to func prototype
      if (descriptor.accessors) {

        // flags are accessors with the boolean boilerplate removed
        var accessors = create.call([
          descriptor.accessors,
          flagsToAccessor(descriptor.flags)
        ], { wrap: o => ({ [is.function(o) ? 'get' : 'defaultValue']: o }) }); 

        create.call(accessors, (n, d) => defineAccessor(func.prototype, n, d));
      }

      if (descriptor.fields) {

      }
      
      return {
        func: func,
        name: name,
        children: descriptor.children,
        pluralName: descriptor.pluralName || name + 's',
        action: {
          wrap: descriptor.wrap,
          thunks: descriptor.thunks,
          defaults: descriptor.defaults,
        }
      };
    }
  });  
}

function defineGetMethods(target, name, pluralName, func) {
  var pluralName = stringEx.capitalize(pluralName);
  var singularName = 'get' + name;
  
  if (pluralName in target)
    return;
  
  // define 'getMyChild(name)'
  defineConstHiddenProperty(target, pluralName, bind1st(Node.prototype.children, func));

  // define 'MyChildren()'
  defineConstHiddenProperty(target, singularName, bind2nd(Node.prototype.getChild, func));
};

function defineAllGetMethods(target, name, pluralName, func) {
  defineGetMethods(target, name, pluralName, func);
  
  // define get methods up the child hierarchy
  var baseChildCtor = Object.getPrototypeOf(func.prototype).constructor;
  if (baseChildCtor == Node)
    return;
  
  defineAllGetMethods(target, baseChildCtor);
}      

function defineDefineChildren(target, action, name, pluralName) {

    // define; `defineMethod(name, descriptor)' and `defineMethods(descriptor)`
    var childInfo = children[childrenName];
    var defineChildrenName = 'define' + capitalize(childrenName);
    defineConstHiddenProperty(target, defineChildrenName, bind1st(Node.prototype.defineChildren, childInfo));
    defineConstHiddenProperty(target, singularOf(defineChildrenName), bind1st(Node.prototype.defineChild, childInfo));
}

function bindDefineChildren(ctor, action, defaultAction) { 
  return function(descriptors) {
    if (!descriptors)
      return;

    create.call(
      descriptors, [
        (name, descriptor) => 
          new ctor(this, name, descriptor),
        action, 
        defaultAction
      ]
    );
  }  
}

function defineChildMethods(descriptors, target, name, action) {
  var descriptor = descriptors[name];
  var ctor = descriptor.func;
  var defaultAction = descriptor.action;
  
  var defineChildrenName = 'define' + stringEx.capitalize(descriptor.pluralName);
  var defineChildren = bindDefineChildren(ctor, action, defaultAction);

  var defineChildName = 'define' + stringEx.capitalize(name);
  var defineChild = function(name, descriptor) {
    this[defineChildren]({ [name]: descriptor });
  }

  objectEx.defineFunctions(target, {
    [defineChildrenName]: defineChildren,
    [defineChildName]: defineChild
  })
}

function secondPass(descriptors) {   
  return create.call(descriptors, function(name, descriptor) {

    var children = descriptor.children;
    if (!children)
      return descriptor;

    // add child/children accessors to prototype
    for (var childName in children) {
      var child = children[childName];

      defineChildMethods(
        descriptors,
        descriptor.func.prototype,
        childName,
        child
      )
    }
    
    return descriptor;
  });
}

Object.defineProperties(module, {
  exports: { value: defineNodes }
});