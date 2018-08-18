'use strict';

var define = require('@kingjs/enumerable.define');

function take(count) {
  var enumerator = this.getEnumerator();
  
  return function() {    
    if (!enumerator.moveNext() || count-- <= 0)
      return false;
    
    this.current_ = enumerator.current;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: define(take) }
});