'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function initReference(target, x, y, z) {

  // e.g. function resolver() { ... } => 'resolver', function resolver() { ... }
  if (is.namedFunction(x)) {
    this.get = x;
    this.argument = y;
  }

  else {
    assert(is.stringOrSymbol(x))

    // e.g. 'resolver', 'this.bar' => 'resolver', { value: function() { return this.bar; } }
    // e.g. 'resolver', function() { ... } => 'resolver', { value: function() { ... } }
    if (is.string(y) || is.function(y)) {
      this.get = y;
      this.argument = z;
    }

    // e.g. 'resolver', { value: function() { ... } }
    else {
      for (var name in y)
        this[name] = y[name];
    }
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: initReference }
});