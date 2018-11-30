'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function bindLazy(func) {
  var value;
  return function() {
    assert(is.function(this));

    if (is.undefined(value))
      value = func.call(this);
    return value;
  };
}

Object.defineProperties(module, {
  exports: { value: bindLazy }
});