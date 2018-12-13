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
    if (is.symbol(result))
      return null;

    var parent = this.parent;
    if (parent && parent.fullName)
      result = parent.fullName + '.' + result;

    return result; 
  },
});

function resolveName(name) {
  if (!is.string(name) || name.indexOf(period) == -1)
    return name;
  
  var node = this.resolve(name);
  if (node)
    return node.id;

  return null;
}

function lazyAddChild(ctor, nameOrRef, descriptor) {

  var name = resolveName.call(this, nameOrRef);
  if (!name)
    return [() => lazyAddChild.call(this, ctor, nameOrRef, descriptor)];

  var child = new ctor(this, name, descriptor);
  objectEx.defineConstField(this.children, name, child);

  var result;
  if (descriptor)
    result = lazyAddChildren.call(child, descriptor);

  return result;
}

function lazyAddChildren(children) {
  if (!children)
    return;

  var info = this.constructor[attrSym].info.children;
  var ctors = info.ctors;

  var result;
  for (var type in ctors) {
    var promises = lazyAddChildrenOfType.call(this, type, children[type]);
    if (promises)
      result = result ? result.concat(promises) : promises; 
  }

  return result;
}

function lazyAddChildrenOfType(type, children) {
  if (!children)
    return;

  var info = this.constructor[attrSym].info.children;
  var defaults = info.defaults[type];

  var ctor = info.ctors[type];
  var ctorDefaults = ctor[attrSym].info.defaults;

  // flatten children and apply transforms
  children = descriptorNamedCreate(children, [ctorDefaults, defaults]);

  var result;
  for (var name in children) {
    var child = children[name];
    var promises = lazyAddChild.call(this, ctor, name, child);
    if (promises)
      result = result ? result.concat(promises) : promises; 
  }

  return result;
}

function fulfillPromises(promises) {
  if (!promises) 
    return;

  while (promises.length) {
    var result = promises.pop()();
    assert(!result, failedToResolveNameError)
  }
}

objectEx.defineFunctions(Node.prototype, {

  addChild: function(ctor, name, descriptor) {
    lazyAddChild.call(this, ctor, name, descriptor);
    return this.children[name];
  },

  addChildren: function(children) {
    var promises = lazyAddChildren.call(this, children);
    fulfillPromises(promises);
  },

  addChildrenOfType(type, children) {
    var promises = lazyAddChildrenOfType.call(this, type, children);
    fulfillPromises(promises);
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