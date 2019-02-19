'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generates a sequence identical to another 
 * sequence so long as the elements continue to satisfy 
 * a specified condition.
 * 
 * @param {*} predicate 
 */
function takeWhile(predicate) {
  var enumerator = this.getEnumerator();
  var i = 0; 
  
  return function() {    
    
    if (!enumerator.moveNext() || 
      !predicate || 
      !predicate(enumerator.current, i++))
      return false;
    
    this.current_ = enumerator.current;
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: define(takeWhile) }
});