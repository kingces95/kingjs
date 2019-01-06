'use strict';

var { 
  DefineExtension,
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current }
} = Symbol.kingjs;

var defineEnumerable = require('@kingjs/enumerable.define');

var concat = defineEnumerable(function concat(enumerable) {
  var enumerator = this[GetEnumerator]();
  var other = enumerable[GetEnumerator]();
  
  return function() { 
    
    if (!enumerator || !enumerator[MoveNext]()) {   
      enumerator = undefined;
      
      if (!other || !other[MoveNext]()) {        
        this.current_ = undefined;
        return false;
      } 
      else {
        this.current_ = other[Current];
      }
    } 
    else {
      this.current_ = enumerator[Current];
    }
    
    return true;
  };
});

module.exports = IEnumerable[DefineExtension](concat);