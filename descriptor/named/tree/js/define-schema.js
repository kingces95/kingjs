'use strict';

var Node = require('./node');
var defineAccessor = require('./define-accessor');

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var create = require('@kingjs/descriptor.named.create');
var attrSym = require('./attribute');
var defineClass = require('./define-class');
var defineChildren = require('./define-children');
var objectEx = require('@kingjs/object-ex');
var emptyObject = require('@kingjs/empty-object');

function defineSchema(target, descriptors) {

  // first pass; define types
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var name = descriptor.name;
    var isOrphan = descriptor.orphan;
    var baseFunc = target[descriptor.base] || Node;
    defineNode(target, name, baseFunc);
  }

  // second pass: define accessors whose implementation requires funcs
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var func = target[descriptor.name];
    var info = func[attrSym].info = createInfo();
    var prototype = func.prototype;

    objectEx.defineAccessor(prototype, 'is' + func.name, () => true);
    info.defaults.wrap = descriptor.wrap;

    var accessors = loadAccessors(target, descriptor);
    for (var name in accessors) {
      var accessor = accessors[name];
      var accessorName = defineAccessor(prototype, name, accessor);
      info.fields[name] = accessorName;
    }

    var children = loadChildren(target, descriptor);
    defineChildren(prototype, children);
    for (var name in children) {
      var child = children[name];
      info.children.ctors[name] = child.type;
      info.children.defaults[name] = child.defaults;
    }

    var methods = loadMethods(target, descriptor);
    for (var name in methods) {
      var method = methods[name];
      defineMethod(prototype, name, method);
    }
  }
}

function createInfo() {
  return { 
    fields: { },
    defaults: { },
    children: { 
      ctors: { },
      defaults: { }
    } 
  };
}

function defineNode(target, name, baseFunc) {

  var ctor = defineClass(name, baseFunc,
    function init(_parent, _name, descriptor) {
      if (!descriptor)
        return;

      var fields = ctor[attrSym].info.fields;
      for (var name in fields) {
        if (name in descriptor == false)
          continue;

        this[fields[name]] = descriptor[name];
      }
    }
  );

  objectEx.defineConstField(target, name, ctor);
}

function defineMethod(target, name, descriptor) {
  var func = descriptor.func;
  assert(func);

  if (descriptor.lazy) {
    objectEx.defineLazyFunction(target, name, func);
    return;
  }
  
  objectEx.defineFunction(target, name, func);
}

function loadMethods(funcs, descriptor) {
  if (!descriptor.methods)
    return emptyObject;

  return create(descriptor.methods, {
    wrap: 'func'
  });
}

function loadChildren(funcs, descriptor) {
  if (!descriptor.children)
    return emptyObject;

  return create(descriptor.children, {
    thunks: {
      type: o => is.string(o) ? funcs[o] : o
    },
    wrap: 'type'
  });
}

function loadAccessors(funcs, descriptor) {
  var flags = descriptor.flags;
  if (!flags)
    flags = emptyObject;
  
  var accessors = descriptor.accessors;
  if (!accessors)
    accessors = emptyObject;

  return create([
    accessors,
    create(flags, { 
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
  exports: { value: defineSchema }
});