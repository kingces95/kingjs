'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function bindExternal(func, name, isEnumerable) {
  assert(is.function(func));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  return function() {
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
}

Object.defineProperties(module, {
  exports: { value: bindExternal }
});