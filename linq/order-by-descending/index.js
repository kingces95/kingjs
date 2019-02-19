'use strict';

var orderBy = require('@kingjs/linq.order-by');

/**
 * @description Generates a sequence of elements in 
 * ascending order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 */
function orderByDescending(keySelector, lessThan) {
  return orderBy.call(this, keySelector, lessThan, true);
}

Object.defineProperties(module, {
  exports: { value: orderByDescending }
});