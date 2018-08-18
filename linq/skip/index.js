'use strict';

var define = require('@kingjs/enumerable.define');

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