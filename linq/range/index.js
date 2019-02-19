'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generate a range of numbers.
 * 
 * @param {*} start 
 * @param {*} count 
 */
function range(start, count) {    
  return function() {
    
    if (count-- <= 0) {
      this.current_ = undefined;
      return false;
    }
    
    this.current_ = start++;
    return true;
  }
};


Object.defineProperties(module, {
  exports: { value: define(range) }
});