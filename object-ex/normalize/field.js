'use strict';
function normalizeField(target, name, value) {
  var descriptor = { value };
  return { target, name, descriptor };
}

module.exports = normalizeField;
