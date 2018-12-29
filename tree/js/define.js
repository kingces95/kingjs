'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var create = require('@kingjs/descriptor.named.create');
var objectEx = require('@kingjs/object-ex');
var stringEx = require('@kingjs/string-ex');

var attrSym = require('./attribute');
var createCtor = require('@kingjs/create-constructor');

var cap = stringEx.capitalize;
var isConst = 'is';
var addConst = 'add';

var wrap = {
  flag: o => ({ [is.boolean(o) ? 'value' : 'get']: o }),
  accessor: 'type',
  child: 'type',
  method: 'value',
};

function define(target, descriptors) {

  // first pass; define types
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var baseFunc = target[descriptor.base] || this;
    defineNode(target, descriptor.name, baseFunc, descriptor.init);
  }

  // second pass: define accessors whose implementation requires funcs
  for (var i = 0; i < descriptors.length; i++) {
    var descriptor = descriptors[i];
    var name = descriptor.name;
    var func = target[name];
    var info = func[attrSym].info = createInfo(descriptor);

    var flags = wrapAndResolve(target, descriptor.flags, wrap.flag);
    var accessors = wrapAndResolve(target, descriptor.accessors, wrap.accessor);
    var methods = wrapAndResolve(target, descriptor.methods, wrap.method);
    var children = wrapAndResolve(target, descriptor.children, wrap.child);

    defineDiscriminator.call(this, func, name);
    defineFlags.call(this, func, flags, info.fields);
    defineAccessors.call(this, func, accessors, info.fields);
    defineMethods.call(this, func, methods, info.fields);
    defineChildren.call(this, func, children, info.children);
  }
}

function createInfo(descriptor) {
  return { 
    fields: { },
    action: { 
      wrap: descriptor.wrap
    },
    children: { } 
  };
}

function defineNode(target, name, baseFunc, init) {
  var ctor = createCtor(name, baseFunc,
    function(_parent, _name, descriptor) {
      if (!descriptor)
        return;

      var fields = ctor[attrSym].info.fields;
      for (var name in fields) {
        if (name in descriptor == false)
          continue;

        this[fields[name]] = descriptor[name];
      }

      if (init)
        init.call(this, descriptor);
    }
  );

  objectEx.defineConstField(target, name, ctor);
}

function defineDiscriminator(func, name) {
  objectEx.defineField(func.prototype, isConst + name, true);
}

function wrapAndResolve(funcs, descriptors, wrap) {
  return create(descriptors, {
    thunks: {
      type: o => is.string(o) ? funcs[o] : o
    },
    wrap: wrap
  });
}

function defineMethods(func, methods, info) { 
  for (var name in methods) {
    var method = methods[name];
    defineMethod.call(this, func, name, method);
    if (method.initializer)
      info[method.initializer] = name;
  }
}

function defineMethod(func, name, descriptor) {
  descriptor = Object.create(descriptor);

  if (is.function(descriptor))
    descriptor = { value: descriptor };

  if (descriptor.initializer) {
    descriptor.future = true;
    if ('default' in descriptor)
      descriptor.argument = descriptor.default;
  }

  if (descriptor.lazy) 
    descriptor.future = true;

    var target = descriptor.static ? func : func.prototype;
    objectEx.defineFunction(target, name, descriptor);
}

function defineChildren(func, children, info) {
  for (var group in children) {
    var child = children[group];
    defineChild.call(this, func, group, child);
    info[group] = child
  }
}

function defineChild(func, group, descriptor) {
  var target = func.prototype;

  objectEx.defineFunction(
    target, 
    addConst + cap(group), 
    function(descriptors) {
      this.addChildrenOfType(group, descriptors);
    }
  );

  if (descriptor.singleton) {
    objectEx.defineAccessor(target, group, `this.children.${group}`);
    return;
  }

  objectEx.defineFunction(
    target, 
    addConst + descriptor.type.name, 
    function(name, descriptor) {
      return this.addChildOfType(group, name, descriptor);
    }
  );
}

function defineAccessors(func, accessors, info) {
  for (var name in accessors) {
    var accessor = accessors[name];
    defineAccessor.call(this, func, name, accessor);
    info[name] = name;
  }
}

function defineAccessor(func, name, descriptor) {
  descriptor = Object.create(descriptor);

  if (descriptor.lazy)
    descriptor.future = true;

  if (descriptor.ancestor) {
    var type = descriptor.type;
    assert(is.function(type));
    assert(type == this || type.prototype instanceof this);

    descriptor.future = true;
    descriptor.argument = type;
    descriptor.get = this.prototype.getAncestor
  }

  else if (descriptor.ref) {
    var type = descriptor.type;
    descriptor.set = true;
    descriptor.future = true;
    descriptor.argument = descriptor.default;
    descriptor.get = descriptor.array ? 
      function resolveTokenArray(token) {
        if (is.null(token))
          return null;
        
        assert(is.array(token));
        var result = [ ];
        for (var i = 0; i < token.length; i++) 
          result.push(this.resolve(token[i]));
        for (var i = 0; i < result.length; i++) 
          assert(result[i] instanceof type);
        return result;
      } : 
      function resolveToken(token) {
        if (is.null(token))
          return null;

        var result = this.resolve(token); 
        assert(result instanceof type);
        return result;
      }
  }

  descriptor.enumerable = true;
  if ('value' in descriptor)
    descriptor.writable = true;
  else if ('get' in descriptor == false)
    return; // todo: should be write-once

  var target = descriptor.static ? func : func.prototype;
  objectEx.defineProperty(target, name, descriptor);
}

function defineFlags(func, flags, info) {
  for (var name in flags) {
    var flag = flags[name];
    var exportedName = isConst + cap(name);
    defineFlag.call(this, func, exportedName, flag);
    info[name] = exportedName;
  }
}

function defineFlag(func, name, descriptor) {
  descriptor = Object.create(descriptor);

  if (is.boolean(descriptor)) 
    descriptor = { value: descriptor };

  else if (is.function(descriptor))
    descriptor = { get: descriptor };

  descriptor.enumerable = true;
  if ('value' in descriptor)
    descriptor.writable = true;

  objectEx.defineProperty(func.prototype, name, descriptor);
}

Object.defineProperties(module, {
  exports: { value: define }
});