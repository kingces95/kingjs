'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var defineProperty = require('./property');
var defineStatic = require('./static');
var stubLazy = require('../stub/lazy');
var stubExternal = require('../stub/external');
var bindThunk = require('../thunk/func');

function defineFunction(target, name, descriptor) {
  var value = descriptor.value;

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
    value = stubExternal(value, name, isStatic, isEnumerable);

  if (descriptor.lazy)
    value = stubLazy(value, name, isStatic, isEnumerable);
    
  descriptor.value = value;

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});