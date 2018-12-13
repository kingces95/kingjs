'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var descriptorNamedCreate = require('@kingjs/descriptor.named.create');

var attrSym = require('./attribute');
var period = '.';

var failedToResolveNameError = 'Failed to resolve member name to an id.'

function Node(parent, name, descriptor) {
  this.name = name || null;
  this.parent = parent || null;
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
    var stack = arguments[3];  
    var child = new ctor(this, name, descriptor);
    if (descriptor)
      child.addChildren(descriptor, stack);

    objectEx.defineConstField(this.children, name, child);
    return child;
  },

  addChildren: function(children) {
    if (!children)
      return;

    var info = this.constructor[attrSym].info.children;
    var ctors = info.ctors;
  
    var stack = arguments[1] || [];
    for (var type in ctors)
      this.addChildrenOfType(type, children[type], stack);
  
    if (stack != arguments[1]) {
      // execute second pass
      while (stack.length)
        stack.pop()();
    }
  },

  addChildrenOfType(type, children) {
    if (!children)
      return;

    var info = this.constructor[attrSym].info.children;
    var defaults = info.defaults[type];

    var ctor = info.ctors[type];
    var ctorDefaults = ctor[attrSym].info.defaults;

    // flatten children and apply transforms
    children = descriptorNamedCreate(children, [ctorDefaults, defaults]);

    var stack = arguments[2] || [];
    for (var name in children) {

      var child = children[name];

      // potentially yield execution to second pass
      if (is.string(name) && name.indexOf(period) != -1) {
        var node = this.resolve(name);
        if (!node) {
          // yield execution to second pass
          stack.push(() => {
            var node = this.resolve(name);
            assert(node != null, failedToResolveNameError);
            this.addChild(ctor, node.id, child)
          });
          continue;
        }
        name = node.id;
      }

      this.addChild(ctor, name, child, stack);
    }

    if (stack != arguments[2]) {
      // execute second pass
      while (stack.length)
        stack.pop()();
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