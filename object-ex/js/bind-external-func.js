'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function bindExternalFunction(stub, name, isEnumerable) {
  assert(is.function(stub));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  return function() {
    var value = stub.call(this, name);
    assert(value);

    Object.defineProperty(this, name, {
      configurable: true,
      enumerable: isEnumerable,
      value: value
    });

    return value.apply(this, arguments);
  };
}

Object.defineProperties(module, {
  exports: { value: bindExternalFunction }
});