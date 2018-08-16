'use strict';

var concat = require('@kingjs/linq.concat');
var sequence = require('@kingjs/sequence');

function prepend(value) {
  return concat.call(sequence(value), this);
};

Object.defineProperties(module, {
  exports: { value: prepend }
});