'use strict';

var concat = require('@kingjs/linq.concat');
require('kingjs');

function prepend(value) {
  return concat.call(sequence(value), this);
};

Object.defineProperties(module, {
  exports: { value: prepend }
});