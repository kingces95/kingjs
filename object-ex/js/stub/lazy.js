'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = "Stub failed to return a value.";
var errorReplaceSelf = "Stub cannot replace itself.";

function stubLazy(func, name, isStatic, isEnumerable, isAccessor) {
  assert(is.function(func));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  if (isStatic) 
    return bindStatic(func);

  return bind(func, name, isEnumerable, isAccessor);
}

function bindStatic(func) {
  var value;

  return function() {
    assert(is.function(this));

    if (is.undefined(value)) {
      value = func.call(this);
      assert(value, errorUndefined);
    }

    return value;
  };
}

function bind(func, name, isEnumerable, isAccessor) {
  return function() {
    assert(!is.function(this));
    assert(!this.hasOwnProperty(name), errorReplaceSelf);

    var value = func.call(this);
    assert(!is.undefined(value), errorUndefined)
    
    Object.defineProperty(this, name, {
      enumerable: isEnumerable,
      [ isAccessor ? 'get' : 'value' ]: () => value
    })

    return value;
  };  
}

Object.defineProperties(module, {
  exports: { value: stubLazy }
});