'use strict';

var define = require('@kingjs/enumerable.define');

function concat(enumerable) {
  var enumerator = this.getEnumerator();
  var other = enumerable.getEnumerator();
  
  return function() { 
    
    if (!enumerator || !enumerator.moveNext()) {   
      enumerator = undefined;
      
      if (!other || !other.moveNext()) {        
        this.current_ = undefined;
        return false;
      } 
      else {
        this.current_ = other.current;
      }
    } 
    else {
      this.current_ = enumerator.current;
    }
    
    return true;
  };
};

Object.defineProperties(module, {
  exports: { 
    value: define(concat) 
  }
});