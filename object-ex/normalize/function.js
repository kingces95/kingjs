'use strict';
var assert = require('assert');

var is = require('@kingjs/is');

function initFunction(target, x, y) {

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    this.value = x;
  }

  else {
    assert(is.stringOrSymbol(x))

    // e.g. 'foo', 'this.bar' => 'foo', { value: function() { return this.bar; } }
    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    if (is.string(y) || is.function(y))
      this.value = y;

    // e.g. 'foo', { value: function() { ... } }
    else {
      for (var name in y)
        this[name] = y[name];
    }
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: initFunction }
});