'use strict';

var transform = require('@kingjs/descriptor.family.transform');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');

/**
 * Data structure is a tree where each node 
 *  (a) is a type derived from Node
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
 * Maps nicely to graphs of reflection objects like Type, Property, and Module.
 */

function Node(parent, name, descriptor) {
  assert(name);

  if (parent)
    parent.attachChild(name, this);
          
  var fullName = name;
  if (parent.fullName)
    fullName = parent.fullName + '.' + fullName;
  
  objectEx.defineConstProperties(this, {
    name: name,
    fullName: fullName,    
    parent: parent,
  });
  
  objectEx.defineHiddenConstProperties(this, {
    _: descriptor,
    children_: { },
  });
};

objectEx.defineFunctions(Node.prototype, {
  
  getAncestor: function(ctor) {
    if (!ctor)
      return this.parent;
    
    if (!this.parent)
      return null;
    
    if (this.parent instanceof ctor)
      return this.parent;
    
    return this.parent.getAncestor(ctor);
  },

  getChild: function(name, ctor) {
    if (!name)
      return null;
    
    var result = name.split('.').reduce(
      function(parent, childName) {
        
        var child = parent ? parent.children_[childName] : null;
        if (!child)
          return null;
        
        return child;
      }, this
    );
    
    if (ctor && !(result instanceof ctor))
    return null;
    
    if (result)
      result.load_();
    
    return result;
  }, 
  
  children: function(ctor) {
    
    // get all children (of a specific type)
    var result = values(this.children_).filter(
      function(x) { 
        return !ctor || x instanceof ctor 
      }
    );
    
    // load children
    result.forEach(function(x) { x.load_(); });  
    
    return result;
  },
  
  resolve: function(ref, ctor) {
    if (!ref)
      return;
    
    var parent = this.parent;
    while (parent) {
      var resolution = parent.getChild_(ref, ctor);
      if (resolution)
        return resolution;
      parent = parent.parent;
    }
    
    Assert.fail('Failed to load: ' + ref);
  },
  
  defineChild: function(childInfo, name, descriptor) {
    
    // normalize functions
    if (isFunction(name)) {     
      descriptor = name;
      name = descriptor.name;
    }
    
    // children containing a single child
    var children = { };
    children[name] = descriptor;
    
    this.defineChildren(childInfo, children);
  },
  
  defineChildren: function(childInfo, children) {
    var ctor = childInfo.func;
    var parent = this;
    
    mapDescriptor(
      createMapDescriptorMetadata(
        function(name, descriptor) {
          buildTree(ctor, parent, name, descriptor)
        }, 
        childInfo, // custom defaults
        ctor.nodeInfo), // general defaults
      children
    );
  },
   
  onLoad: /* virtual */ function() { },
 
  attachChild: /* virtual */ function(name, child) {  
    this.children_[name] = child;
  },

  load_: function() { 
    if (this.isLoaded_)
      return;
    objectEx.defineHiddenConstProperty(this, 'isLoaded_', true);
    
    // assume dependencies exceeding maxDependencies => a loader cycle
    loaderStack_.push(this.fullName);
    Assert.that(loaderStack_.length < maxDependencies_);
    //Logger.log(loaderStack_);
    {
      var fields = this._;
      var deps = this.constructor.nodeInfo.accessors;
      
      for (var name in deps) {
        var depInfo = deps[name];
        
        // only consider dependencies (i.e. eager references)
        if (!depInfo.ref || depInfo.lazy)
          continue;
        
        // a) dependency array
        if (depInfo.array) {
          fields[name] = flatten.call(this, function(x) { 
            return this.resolve(x, depInfo.func);
          }, fields[name]);
        }
        
        // b) dependency singleton
        else {
          fields[name] = this.resolve(fields[name], depInfo.func);
        }
      }
    }
    loaderStack_.pop();
    
    this.onLoad();
  },
});    

defineHiddenProperty(Node, 'nodeInfo', { });

defineFunctions(this, {
  
  defineTree: function(target, descriptor) {
    
    //  this.Metadata.prototype.resolve = function(ref) {
    //    var result = module_.Node.prototype.resolve.call(this, ref);
    //    if (result)
    //      return result;
    //    
    //    // resolve via ref.constructor.info
    //    return undefined;
    //  };
    
    //Assert.equals(Object.getPrototypeOf(Class.prototype).constructor, Type);
    
    var result = mapDescriptor([{
      defaults: { 
        base: Node
      },
      depends: {
        base: function(value) { return value.func; }
      },
      refs: {
        'children.*.func': 'a0.func',
        'accessors.*.func': 'a0.func'
      },
      func: function firstPass(name, descriptor) {
        
        // augment accessors with flags
        descriptor.accessors = [
          descriptor.accessors,
          
          // flags
          mapDescriptor({ 
            wrap: function(x) {
              return isBoolean(x) ? { defaultValue: x } : { get: x };              
            },
            defaults: { func: Boolean }
          }, descriptor.flags)
        ];
        
        // declare func as derivation of base
        var base = descriptor.base;
        var func = defineBase(function() {
          base.apply(this, arguments); 
        }, base);
         descriptor.func = func;
        
        // default predicates
        defineConstHiddenProperty(func.prototype, 'is' + capitalize(name), true);
        
        // add nodeInfo to func
        func.nodeInfo = {
          name: name,
          wrap: descriptor.wrap,
          thunks: descriptor.thunks,
          defaults: descriptor.defaults,        
        };

        // add methods to func prototype
        descriptor.methods = mapDescriptor({ wrap: 'func' }, descriptor.methods);
        var methods = descriptor.methods;
        func.nodeInfo.methods = methods;  
        mapDescriptor(function(methodName, method) {
          defineFunction(func.prototype, methodName, method.func);
        }, methods);
        
        // add field accessors to func prototype
        descriptor.accessors = mapDescriptor({ wrap: 'func' }, descriptor.accessors);
        var accessors = descriptor.accessors;
        func.nodeInfo.accessors = accessors;  
        mapDescriptor(function(accessorName, accessor) {
          var type = accessor.func;
          var get = accessor.get;
          var ancestor = accessor.ancestor;
          var ref = accessor.ref;
          var lazy = accessor.lazy;
          var defaultValue = accessor.defaultValue;
                   
          if (ancestor) 
            get = function() { return this.getAncestor(type); }
          
          else if (isString(get))
            get = lambda0(get);
               
          else {
            get = function() {              
              if (!this._) return; // works around debugger bug; will SO if removed
              
              var value = this._[accessorName];
              
              // resolve
              if (ref && isString(value))
                value = this.resolve(value, type);
              
              // default
              if (isUndefined(value))
                value = defaultValue;
              
              return value;
            };
          }
          
          if (lazy) {
            var eagerGet = get;
            get = function() {
              if (!this._) return; // works around debugger bug; will SO if removed
              
              var value = this._[accessorName];
              if (value === undefined)
                value = this._[accessorName] = eagerGet.call(this);
              return value;
            }
          }
          
          // per Object.defineProperty convention, prefix predicates with 'is'
          var publicAccessorName = accessorName;
          if (type == Boolean)
            publicAccessorName = 'is' + capitalize(accessorName);
          
          // define
          defineAccessor(func.prototype, publicAccessorName, get);          
        }, accessors);
        
        // normalize children descriptors in prep for 2nd pass
        descriptor.children = mapDescriptor({ wrap: 'func' }, descriptor.children);
        func.nodeInfo.children = descriptor.children;      
        
        descriptor.name = name;
        return descriptor;
      }
    }, function secondPass(name, descriptor) {      
      var func = descriptor.func;

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
      
      // define get methods up the child hierachy; `getBaseFoo(name)` and 'baseFoos()'
      var defineAllGetMethods = function(target, childFunc) {
        defineGetMethods(target, childFunc);
        
        var baseChildCtor = Object.getPrototypeOf(childFunc.prototype).constructor;
        if (baseChildCtor == Node)
          return;
        
        // recurse
        defineAllGetMethods(target, baseChildCtor);
      }      
      
      // add child/children accessors to prototype
      var children = descriptor.children || emptyArray;
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
     
      return descriptor;
    }], descriptor);
    
    mapDescriptor(function(name, descriptor) {
      this[name] = descriptor.func;
    }, result);  
  },
  
  buildTree: function(ctor, parent, name, descriptor) {
    var node = new ctor(parent, name, descriptor);
    
    // add subTrees of children
    var nodeInfo = ctor.nodeInfo || emptyObject;    
    for (var childrenName in nodeInfo.children)
      node.defineChildren(nodeInfo.children[childrenName], descriptor[childrenName]);
    
    return node;
  },
})


Object.defineProperties(module, {
  exports: { value: Node }
});