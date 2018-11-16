'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var stringEx = require('@kingjs/string-ex');
var assert = require('@kingjs/assert');

function Root(descriptor) {
}

objectEx.defineFunctions(Node.prototype, {
  resolve: function(path) {
  }
})

// virtual
objectEx.defineFunctions(Root.prototype, {
  onLoad: function() { },
  attachChild: function(name, child) {  
    this.children[name] = child;
  },
});

objectEx.defineLazyAccessors(Root.prototype, {
  children: () => {{ }}
});

function Node(parent, name, descriptor) {
  Root.prototype.call(this, descriptor);

  assert(name);
  assert(parent);

  objectEx.defineConstProperty(this, 'name', parent);
  objectEx.defineConstProperty(this, 'parent', parent);

  // add subTrees of children
  //var ctor = this.constructor;
  //var nodeInfo = ctor.nodeInfo || emptyObject;    
  //for (var childrenName in nodeInfo.children)
  //  this.defineChildren(nodeInfo.children[childrenName], descriptor[childrenName]);

  parent.attachChild(name, this);
};
Node.prototype = new Root();
Node.prototype.function = Node;

objectEx.defineLazyAccessors(Node.prototype, {

  path: function() {
    if (!this.parent.name)
      return this.name;

    return this.parent.path + '.' + this.name;
  },
});

objectEx.defineFunctions(Node.prototype, {
  
  getAncestor: function(ctor) {
    var parent = this.parent;

    if (!ctor)
      return parent;
    
    if (!parent || parent instanceof ctor)
      return parent;
    
    return parent.getAncestor(ctor);
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