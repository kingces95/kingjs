'use strict';

var assert = require('@kingjs/assert');
var defineProperty = require('./property');
var defineStatic = require('./static');

function defineField(target, name, descriptor) {
  var isEnumerable = descriptor.enumerable;

  if (descriptor.static) {
    assert(!descriptor.configurable);
    
    defineStatic(target, name, {
      enumerable: isEnumerable,
      get: () => target[name],
      set: value => target[name] = value
    });
  }

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineField }
});