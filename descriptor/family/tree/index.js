'use strict';

var transform = require('@kingjs/descriptor.family.transform');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');

/**
 * Data structure is a lexical tree where each node has:
 *  (1) an optional `parent` (only the root is without a parent), 
 *  (2) a `name` and a unique `fullName` formed by the dot delimited 
 *      concatenation of a node's ancestor's names plus the node name.
 *  (3) a descriptor stored in `_` of 'private' data available to 
 *      properties, accessors, and methods attached to the node prototype.
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
  
  getChild_: function(name, ctor, load) {
    if (!name)
      return null;
    
    var result = name.split('.').reduce(
      function(parent, childName) {
        
        var child = parent ? parent.children_[childName] : null;
        if (!child)
          return null;
        
        if (load)
          child.load_();
        
        return child;
      }, this
    );
    
    if (ctor && !(result instanceof ctor))
    return null;
    
    if (result)
      result.load_();
    
    return result;
  }, 
  
  onLoad: /* virtual */ function() { },
  
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
  
  attachChild: /* virtual */ function(name, child) {  
    this.children_[name] = child;
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
    return this.getChild_(name, ctor, true);
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
  }  
});    

Object.defineProperties(module, {
  exports: { value: tree }
});