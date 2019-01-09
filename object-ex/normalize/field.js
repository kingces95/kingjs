'use strict';
var normalizeName = require('./name');

function normalizeField(target, name, value) {
  var descriptor = { value };
  return normalizeName(target, name, descriptor);
}

module.exports = normalizeField;
