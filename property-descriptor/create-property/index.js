'use strict';
var assert = require('assert');

var {
  '@kingjs/is': is,
} = require('@kingjs/require-packages').call(module);

function normalize(target, x, y) {
  var name, descriptor;

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    name = x.name;
    descriptor = { 
      function: true,
      value: x 
    };
  }

  else {
    name = x;
    assert(is.stringOrSymbol(name))

    // e.g. 'foo', 'this.bar' => 'foo', { value: function() { return this.bar; } }
    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    // e.g. 'foo', true => 'foo', { value: true }
    if (!is.object(y))
      descriptor = { value: y };

    // e.g. 'foo', { ... }
    else
      descriptor = { ...y };
  }

  return { target, name, descriptor };
}

module.exports = normalize;
