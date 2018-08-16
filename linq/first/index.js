'use strict';

var where = require('@kingjs/linq.where');

function first(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = where.call(enumerable, predicate);
  
  var enumerator = enumerable.getEnumerator();
  
  if (!enumerator.moveNext())
    throw 'first: Sequence contains no matching elements.';
  
  return enumerator.current;
};

Object.defineProperties(module, {
  exports: { value: first }
});