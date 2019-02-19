'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generates a sequence identical to another sequence 
 * after bypassing a specified number of elements.
 * 
 * @param {*} count 
 */
function skip(count) {
  var enumerator = this.getEnumerator();
  
  return function() {    
    
    do {      
      if (!enumerator.moveNext())
        return false;
    } while (count-- > 0);
    
    this.current_ = enumerator.current;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: define(skip) }
});