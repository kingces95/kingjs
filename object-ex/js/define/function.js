'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var defineProperty = require('./property');
var stubLazy = require('../stub/lazy');
var bindLazy = require('../bind/lazy');
var defineStatic = require('./static');
var stubExternal = require('../stub/external-func');
var bindThunk = require('../bind/thunk');

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

  //assert(!(descriptor.lazy && descriptor.external))

  if (descriptor.external)
    value = stubExternal(value, name, isEnumerable);

  if (descriptor.lazy)
    value = isStatic ? bindLazy(value) : stubLazy(value, name, isEnumerable);
    
  descriptor.value = value;

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});