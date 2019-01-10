'use strict';
var assert = require('assert');

function normalizeField(target, name, value) {
  var descriptor = { value };
  return { target, name, descriptor };
}

module.exports = normalizeField;