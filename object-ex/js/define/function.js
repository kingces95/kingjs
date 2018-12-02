'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineThunkToStatic = require('./static');
var lazy = require('../lazy');

function defineFunction(target, name, descriptor) {
  var value = descriptor.value;

  var isAccessor = true;
  var isStub = true;
  var isStatic = descriptor.static;
  var isEnumerable = descriptor.enumerable;

  if (is.string(value))
    value = new Function('return ' + value + ';');

  if (isStatic) {
    assert(!descriptor.configurable);
    defineThunkToStatic(target, name, isEnumerable, !isAccessor);
  }

  if (descriptor.external)
    value = lazy(value, name, isStatic, isStub, isEnumerable, !isAccessor);

  if (descriptor.lazy)
    value = lazy(value, name, isStatic, !isStub, isEnumerable, !isAccessor);
    
  descriptor.value = value;

  Object.defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});