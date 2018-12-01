'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function stubExternalAccessor(stub, name, isEnumerable) {
  assert(is.function(stub));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  return function() {
    var value = stub.call(this, name);
    assert(value);
   
    var isGet = arguments.length == 0;
    if (is.function(value))
      value = { [isGet ? 'get' : 'set']: value };

    value.configurable = false;
    value.enumerable = isEnumerable;

    Object.defineProperty(this.constructor.prototype, name, value);

    if (isGet)
      return value.get.apply(this);
    
    value.set.apply(this, arguments);
  };
}

Object.defineProperties(module, {
  exports: { value: stubExternalAccessor }
});