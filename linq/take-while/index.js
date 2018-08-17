'use strict';

var define = require('@kingjs/enumerable.define');

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