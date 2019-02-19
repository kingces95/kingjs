'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generates a sequence identical to another 
 * sequence after bypassing the first contiguous set of 
 * elements which satisfy a specified condition.
 * 
 * @param {*} predicate 
 */
function skipWhile(predicate) {
  var enumerator = this.getEnumerator();
  var i = 0;
  
  return function() {    
    
    do {      
      if (!enumerator.moveNext())
        return false;
    } while (predicate && predicate(enumerator.current, i++));
    
    predicate = undefined;
    
    this.current_ = enumerator.current;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: define(skipWhile) }
});