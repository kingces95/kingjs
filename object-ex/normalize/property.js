'use strict';
var assert = require('assert');
var is = require('@kingjs/is');
var normalizeName = require('./name');

function normalizeProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  descriptor = { ...descriptor };
  return normalizeName(target, name, descriptor);
}

module.exports = normalizeProperty;
