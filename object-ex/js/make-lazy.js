'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var notAccessorOrFunctionError = 'Unable to make lazy descriptor.';

function makeLazy(name) {

  var funcName = this.get ? 'get' : 'value';
  var func = this[funcName];
  var isEnumerable = this.enumerable;
  assert(is.function(func), notAccessorOrFunctionError);

  this[funcName] = function() {
    var value = func.call(this);
    if (is.undefined(value))
      return value;

    Object.defineProperty(this, name, {
      configurable: false,
      enumerable: isEnumerable,
      value: value
    });

    return value;
  };

  return this;
}

Object.defineProperties(module, {
  exports: { value: makeLazy }
});