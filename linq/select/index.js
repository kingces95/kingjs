'use strict';

var define = require('@kingjs/enumerable.define');

/**
 * @description Generates a sequence of elements composed of 
 * elements of another sequence subject to a transform.
 * 
 * @param {*} selector 
 */
function select(selector) {
  var enumerator = this.getEnumerator();
  var i = 0;
  
  return function() {    
    if (!enumerator.moveNext())
      return false;
    
    this.current_ = selector(enumerator.current, i++);
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: define(select) }
});