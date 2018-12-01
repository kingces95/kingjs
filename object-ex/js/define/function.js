'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineProperty = require('./property');
var defineStatic = require('./static');
var lazy = require('../lazy');
var bindThunk = require('../thunk/func');

function defineFunction(target, name, descriptor) {
  var value = descriptor.value;

  var isAccessor = true;
  var isStub = true;
  var isStatic = descriptor.static;
  var isEnumerable = descriptor.enumerable;
  if (is.undefined(isEnumerable))
    isEnumerable = false;

  if (is.string(value))
    value = new Function('return ' + value + ';');

  if (isStatic) {
    assert(!descriptor.configurable);
    defineStatic(target, name, {
      enumerable: isEnumerable,
      value: bindThunk(target, name)
    });
  }

  if (descriptor.external)
    value = lazy(value, name, isStatic, isStub, isEnumerable, !isAccessor);

  if (descriptor.lazy)
    value = lazy(value, name, isStatic, !isStub, isEnumerable, !isAccessor);
    
  descriptor.value = value;

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});