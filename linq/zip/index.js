'use strict';

var define = require('@kingjs/enumerable.define');

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