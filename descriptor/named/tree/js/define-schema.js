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
var stringEx = require('@kingjs/string-ex');

var cap = stringEx.capitalize;

function defineSchema(target, descriptors) {

  // first pass; define types
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var baseFunc = target[descriptor.base] || Node;
    defineNode(target, descriptor.name, baseFunc);
  }

  // second pass: define accessors whose implementation requires funcs
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var func = target[descriptor.name];
    var info = func[attrSym].info = createInfo(descriptor);

    defineDiscriminator(func);
    defineFlags(func, descriptor.flags, info.fields);
    defineAccessors(func, descriptor.accessor, info.fields);
    defineChildren(func, descriptor.children, info.children);
    defineMethods(func, descriptor.methods, info.methods);
  }
}

function createInfo(descriptor) {
  return { 
    fields: { },
    defaults: { 
      wrap: descriptor.wrap
    },
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

function defineDiscriminator(func) {
  objectEx.defineField(func.prototype, 'is' + func.name, true);
}

function wrapAndResolve(funcs, descriptor) {
  if (is.string(descriptor))
    descriptor = { type: descriptor };

  if (is.string(descriptor.type))
    descriptor.type = funcs[descriptor.type];

  return descriptor;
}

function defineMethods(info, func, methods) {
  for (var name in methods) {
    var method = methods[name];
    defineMethod(func, name, method);
  }
}

function defineMethod(func, name, descriptor) {
  if (is.function(descriptor))
    descriptor = { value: descriptor };

  if (descriptor.lazy) 
    descriptor.future = true;
  
  objectEx.defineFunction(func.prototype, name, descriptor);
}

function defineChildren(func, children, info) {
  for (var name in children) {
    var child = children[name];
    defineChild(func, name, child);
    info.ctors[name] = child.type;
    info.defaults[name] = child.defaults;
  }
}

function defineChild(func, name, descriptor) {
  descriptor = wrapAndResolve(descriptor);

  objectEx.defineFunction(
    func.prototype,
    'add' + cap(name),
    function(descriptors) {
      this.addChildrenOfType(name, descriptors) 
    },
  );
}

function defineAccessors(func, accessors, info) {
  for (var name in accessors) {
    var accessor = accessors[name];
    defineAccessor(func, name, accessor);
    info[name] = name;
  }
}

function defineAccessor(func, name, descriptor) {
  descriptor = wrapAndResolve(descriptor);

  if (descriptor.ancestor) {
    var type = descriptor.type;
    assert(is.function(type));
    assert(type == Node || type.prototype instanceof Node);

    descriptor.argument = type;
    descriptor.future = true;
    descriptor.get = Node.prototype.getAncestor
  }

  else if (descriptor.ref) {
    descriptor.future = true;
    descriptor.set = true;
    descriptor.get = function(token) {
      var result = this.resolve(token); 
      assert(result === null || result instanceof type);
      return result;
    }
  }

  descriptor.enumerable = true;

  objectEx.defineProperty(func.prototype, name, descriptor);
}

function defineFlags(func, flags, info) {
  for (var name in flags) {
    var flag = flags[name];
    var exportedName = 'is' + cap(name);
    defineFlag.call(func, exportedName, flag);
    info[name] = exportedName;
  }
}

function defineFlag(func, name, descriptor) {
  if (is.boolean(descriptor)) 
    descriptor = { value: descriptor };

  else if (is.function(descriptor))
    descriptor = { get: descriptor };

  descriptor.enumerable = true;
  descriptor.prefix = 'is';

  objectEx.defineProperty(func.prototype, name, descriptor);
}

Object.defineProperties(module, {
  exports: { value: defineSchema }
});