'use strict';

var where = require('@kingjs/linq.where');

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