'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function bindExternal(stub, name, isEnumerable) {
  assert(is.function(stub));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  return function() {
    var value = stub.call(this, name);
    if (is.undefined(value))
      return value;

    Object.defineProperty(this, name, {
      configurable: false,
      enumerable: isEnumerable,
      value: value
    });

    return value.apply(this, arguments);
  };
}

Object.defineProperties(module, {
  exports: { value: bindExternal }
});