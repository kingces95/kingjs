'use strict';
var assert = require('assert');

var {
  '@kingjs/is': is,
} = require('@kingjs/require-packages').call(module);

function normalizeProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  descriptor = { ...descriptor };
  return { target, name, descriptor };
}

module.exports = normalizeProperty;
