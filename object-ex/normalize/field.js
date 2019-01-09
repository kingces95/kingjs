'use strict';

function normalizeField(target, name, value) {
  return { target, name, descriptor: { value } };
}

module.exports = normalizeField;
