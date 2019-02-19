'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generates a sequence of elements composed 
 * of elements of two sequences which share the same index.
 * 
 * @param {*} other 
 * @param {*} result 
 */
function zip(other, result) {
  var first = this.getEnumerator();
  var second = other.getEnumerator();
  
  return function() {    
    if (!first.moveNext() || !second.moveNext())
      return false;
    
    this.current_ = result(first.current, second.current);
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: define(zip) }
});