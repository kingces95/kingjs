'use strict';

var where = require('@kingjs/linq.where');

/**
 * @description Returns the last element of a sequence 
 * that satisfies a specified condition or a undefined.
 * 
 * @param {*} predicate 
 */
function lastOrUndefined(predicate) {
  var enumerable = this;
      
  if (predicate)
    enumerable = where.call(enumerable, predicate);
  
  var enumerator = enumerable.getEnumerator();  
  
  var current;
  while (enumerator.moveNext())
    current = enumerator.current;
  
  return current;
};

Object.defineProperties(module, {
  exports: { value: lastOrUndefined }
});