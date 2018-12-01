'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function stubLazy(func, name, isEnumerable, isAccessor) {
  assert(is.function(func));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  return function() {
    assert(!is.function(this));

    if (this.hasOwnProperty(name))
      return undefined;

    var value = func.call(this);

    if (value !== undefined) {
      Object.defineProperty(this, name, {
        enumerable: isEnumerable,
        [ isAccessor ? 'get' : 'value' ]: () => value
      })
    }

    return value;
  };  
}

Object.defineProperties(module, {
  exports: { value: stubLazy }
});