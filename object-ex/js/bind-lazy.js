'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function bindLazy(func, name, isEnumerable, isStatic, isAccessor) {
  assert(is.function(func));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  if (isStatic)
    return bindLazyStatic(func);

  return function() {
    assert(!is.function(this));

    var value = func.apply(this, arguments);

    if (value !== undefined) {
      Object.defineProperty(this, name, {
        enumerable: isEnumerable,
        [isAccessor ? 'get' : 'value']: () => value
      })
    }

    return value;
  };  
}

function bindLazyStatic(func) {
  var value;
  return function() {
    assert(is.function(this));

    if (is.undefined(value))
      value = func.apply(this, arguments);
    return value;
  };
}

Object.defineProperties(module, {
  exports: { value: bindLazy }
});