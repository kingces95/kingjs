'use strict';
var assert = require('assert');
var is = require('@kingjs/is');
var normalizeName = require('./name');

function normalizeFunction(target, x, y) {
  var name, descriptor;

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    descriptor = { value: x };
  }

  else {
    name = x;
    assert(is.stringOrSymbol(name))

    // e.g. 'foo', 'this.bar' => 'foo', { value: function() { return this.bar; } }
    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    if (is.string(y) || is.function(y))
      descriptor = { value: y };

    // e.g. 'foo', { value: function() { ... } }
    else
      descriptor = { ...y };
  }

  return normalizeName(target, name, descriptor);
}

module.exports = normalizeFunction;
