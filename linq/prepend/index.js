'use strict';

var concat = require('@kingjs/linq.concat');
require('kingjs');

/**
 * @description Generates an sequence identical to another 
 * sequence but with a value added to the start.
 * 
 * @param {*} value 
 */
function prepend(value) {
  return concat.call(sequence(value), this);
};

Object.defineProperties(module, {
  exports: { value: prepend }
});