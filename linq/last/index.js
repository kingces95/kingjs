'use strict';

var where = require('@kingjs/linq.where');

function last(predicate) {
  var enumerable = this;
      
  if (predicate)
    enumerable = where.call(enumerable, predicate);
  
  var enumerator = enumerable.getEnumerator();  
  
  if (!enumerator.moveNext())
    throw 'last: Sequence contains no matching elements.';

  var current = enumerator.current;
  while (enumerator.moveNext())
    current = enumerator.current;
  
  return current;
};

Object.defineProperties(module, {
  exports: { value: last }
});