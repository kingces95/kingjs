'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function initMethod(x, y) {
  assert('configurable' in this);
  assert('enumerable' in this);

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    this.value = x;
  }

  else {
    assert(is.stringOrSymbol(x))

    // e.g. 'foo', 'this.bar' => 'foo', { value: function() { return this.bar; } }
    if (is.string(y))
      this.value = y;

    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    else if (is.function(y))
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
  exports: { value: initMethod }
});