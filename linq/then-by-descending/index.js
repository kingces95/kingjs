'use strict';

/**
 * @description Generates a sequence of elements from a sorted 
 * sequence where elements previously considered equal are put 
 * in descending order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 */
function thenByDescending(keySelector, lessThan) {
  return this.createOrderedEnumerable(keySelector, lessThan, true);
}

Object.defineProperties(module, {
  exports: { value: thenByDescending }
});