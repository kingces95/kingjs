'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var defineProperty = require('./property');
var bindLazy = require('../bind-lazy');
var defineStatic = require('./static');
var bindThis = require('../bind-this');

function defineFunction(target, name, descriptor) {
  var value = descriptor.value;
  var isEnumerable = descriptor.enumerable;

  if (is.string(value))
    value = new Function('return ' + value + ';');

  if (descriptor.static) {
    assert(!descriptor.configurable);
    defineStatic(target, name, {
      enumerable: isEnumerable,
      value: function() { return target[name](); }
    });
  }

  if (descriptor.lazy)
    value = bindLazy(value, name, isEnumerable);
    
  descriptor.value = value;

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});