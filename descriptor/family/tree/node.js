'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');

function Node(parent, name, descriptor) {

  var fullName = name;

  if (parent) {
    assert(name);

    parent.attachChild(name, this);

    if (is.nonEmptyString(parent.fullName))
      fullName = parent.fullName + '.' + fullName;
  }
          
  objectEx.defineConstProperties(this, {
    name: name,
    fullName: fullName,    
    parent: parent,
  });
  
  objectEx.defineHiddenConstProperty(this, 'children__', { });

  // add subTrees of children
  var ctor = this.constructor;
  var nodeInfo = ctor.nodeInfo || emptyObject;    
  for (var childrenName in nodeInfo.children)
    this.defineChildren(nodeInfo.children[childrenName], descriptor[childrenName]);
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
        
        var child = parent ? parent.children__[childName] : null;
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
    var result = values(this.children__).filter(
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
      var resolution = parent.getChild(ref, ctor);
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
        ctor.nodeInfo // general defaults
      ), children    
    );
  },

  onLoad: /* virtual */ function() { },
 
  attachChild: /* virtual */ function(name, child) {  
    this.children__[name] = child;
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

Object.defineProperties(module, {
  exports: { value: Node }
});