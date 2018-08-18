'use strict';

var concat = require('@kingjs/linq.concat');
var sequence = require('@kingjs/enumerable.create');

function prepend(value) {
  return concat.call(sequence(value), this);
};

Object.defineProperties(module, {
  exports: { value: prepend }
});