'use strict';

var Node = require('./node');
var defineAccessor = require('./define-accessor');

var is = require('@kingjs/is');
var create = require('@kingjs/descriptor.named.create');
var defineClass = require('./define-class');
var attrSym = require('./attribute');

function defineNodes(target, descriptors) {

  // first pass; define types
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var name = descriptor.name;
    var baseFunc = target[descriptor.base] || Node;
    defineClass(target, name, baseFunc);
  }

  // second pass: define accessors whose implementation requires funcs
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var func = target[descriptor.name];
    var info = func[attrSym].info = createInfo();

    var accessors = loadAccessors(target, descriptor);
    for (var name in accessors) {
      var accessor = accessors[name];
      var accessorName = defineAccessor(func.prototype, name, accessor);
      info.fields[name] = accessorName;
    }

    var children = loadChildren(target, descriptor);
    for (var name in children) {
      var child = children[name];
      info.children.ctors[name] = child.type;
      info.children.defaults[name] = child.defaults;
      console.log(func.name + ' > ' + name);
    }
  }
}

function createInfo() {
  return { 
    fields: [ ], 
    children: { 
      ctors: { },
      defaults: [ ]
    } 
  };
}

function loadChildren(funcs, descriptor) {
  if (!descriptor.children)
    return { };
  return create(descriptor.children, {
    thunks: {
      type: o => is.string(o) ? funcs[o] : o
    },
    wrap: 'type'
  });
}

function loadAccessors(funcs, descriptor) {
  return create([
    descriptor.accessors,
    create(descriptor.flags, { 
      wrap: o => ({ [is.boolean ? 'value' : 'get']: o }),
      defaults: { type: Boolean }
    })
  ], {
    thunks: {
      type: o => is.string(o) ? funcs[o] : o
    },
    wrap: 'type'
  });
}

Object.defineProperties(module, {
  exports: { value: defineNodes }
});