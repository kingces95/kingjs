'use strict';

var assert = require('@kingjs/assert');
var defineThunkToStatic = require('./static');

function defineField(target, name, descriptor) {
  var isAccessor = true;
  var isEnumerable = descriptor.enumerable;

  if (descriptor.static) {
    assert(!descriptor.configurable);
    defineThunkToStatic(target, name, isEnumerable, isAccessor);
  }

  Object.defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineField }
});