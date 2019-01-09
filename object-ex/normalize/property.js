'use strict';
var assert = require('assert');
var is = require('@kingjs/is');

function normalizeProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  descriptor = { ...descriptor };
  return { target, name, descriptor };
}

module.exports = normalizeProperty;
