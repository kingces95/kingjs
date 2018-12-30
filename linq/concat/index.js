'use strict';

var { define, getEnumerator, moveNext, current } = require('@kingjs/linq.define');
var defineEnumerable = require('@kingjs/enumerable.define');

var concat = defineEnumerable(function concat(enumerable) {
  var enumerator = this[getEnumerator]();
  var other = enumerable[getEnumerator]();
  
  return function() { 
    
    if (!enumerator || !enumerator[moveNext]()) {   
      enumerator = undefined;
      
      if (!other || !other[moveNext]()) {        
        this.current_ = undefined;
        return false;
      } 
      else {
        this.current_ = other[current];
      }
    } 
    else {
      this.current_ = enumerator[current];
    }
    
    return true;
  };
});

define(module, 'exports', concat);