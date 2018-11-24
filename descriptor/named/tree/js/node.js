'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var createDescriptor = require('@kingjs/descriptor.create');

var attrSym = require('./attribute');

function Node(parent, name, descriptor) {
  if (name)
    this.name = name;

  if (parent)
    this.parent = parent;

  if (!descriptor)
    return;

  this.addChildren(descriptor);
};

objectEx.defineLazyAccessors(Node.prototype, {
  children: '{ }',
  fullName: function() {
    var result = this.name;

    var parent = this.parent;
    if (parent && parent.fullName)
      result = parent.fullName + '.' + result;

    return result; 
  },
});

objectEx.defineFunctions(Node.prototype, {

  addChild: function(ctor, name, descriptor) {
    var child = new ctor(this, name, descriptor);
    objectEx.defineConstField(this.children, name, child);
    return child;
  },

  addChildren: function(children) {
    if (!children)
      return;

    var info = this.constructor[attrSym].info.children;
    var ctors = info.ctors;
  
    for (var type in ctors)
      this.addChildrenOfType(type, children[type]);
  },

  addChildrenOfType(type, children) {
    if (!children)
      return;

    var info = this.constructor[attrSym].info.children;
    var ctor = info.ctors[type];
    var defaults = info.defaults[type];

    for (var name in children) {
      var child = children[name];
  
      if (defaults)
        child = createDescriptor(child, defaults);
  
      this.addChild(ctor, name, child);
    }
  },

  getAncestor: function(ctor) {
    var parent = this.parent;

    if (!ctor)
      return parent;
    
    if (!parent || parent instanceof ctor)
      return parent;
    
    return parent.getAncestor(ctor);
  },
  
  resolve: function(ref) {
    if (ref === undefined)
      return undefined;

    if (ref === null)
      return null;
    
    assert(is.string(ref));
    var split = ref.split('.');

    var ancestorOrThis = this;
    while (ancestorOrThis) {
    
      var result = ancestorOrThis;

      for (var i = 0; i < split.length && result; i++)
        result = result.children[split[i]];
      
      if (result)
        return result;

      ancestorOrThis = ancestorOrThis.parent;
    }
  }
});    

Object.defineProperties(module, {
  exports: { value: Node }
});