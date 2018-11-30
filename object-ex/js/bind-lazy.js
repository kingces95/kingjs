'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function bindLazy(func, name, isEnumerable, isStatic, isAccessor) {
  assert(is.function(func));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  if (isStatic) {
    var value;
    return function() {
      assert(is.function(this));

      if (is.undefined(value))
        value = func.call(this);
      return value;
    };
  }

  return function() {
    assert(!is.function(this));

    var value = func.call(this);

    if (value !== undefined) {
      Object.defineProperty(this, name, {
        enumerable: isEnumerable,
        [isAccessor ? 'get' : 'value']: () => value
      })
    }

    return value;
  };  
}

Object.defineProperties(module, {
  exports: { value: bindLazy }
});