'use strict';

/**
 * @description Generates a sequence of elements from a sorted 
 * sequence where elements previously considered equal are 
 * put in ascending order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 */
function thenBy(keySelector, lessThan) {
  return this.createOrderedEnumerable(keySelector, lessThan, false);
}

Object.defineProperties(module, {
  exports: { value: thenBy }
});