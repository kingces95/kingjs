'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var defineProperty = require('./property');
var bindLazy = require('../bind-lazy');
var defineStatic = require('./static');
var bindThis = require('../bind-this');
var bindExternal = require('../bind-external-func');

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
      value: bindThis(value, target)
    });
  }

  //assert(!(descriptor.lazy && descriptor.external))

  if (descriptor.external)
    value = bindExternal(value, name, isEnumerable);

  if (descriptor.lazy)
    value = bindLazy(value, name, isEnumerable, isStatic);
    
  descriptor.value = value;

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});