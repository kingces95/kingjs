'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generate a sequence of a repeated value.
 * 
 * @param {*} element 
 * @param {*} count 
 */
function repeat(element, count) {  
  return function() {
    
    if (count-- <= 0) {
      this.current_ = undefined;
      return false;
    }
    
    this.current_ = element;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: define(repeat) }
});