'use strict';

var where = require('@kingjs/linq.where');

function firstOrUndefined(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = where.call(enumerable, predicate);
  
  var enumerator = enumerable.getEnumerator();
  
  if (!enumerator.moveNext())
    return undefined;
  
  return enumerator.current;
};

Object.defineProperties(module, {
  exports: { value: firstOrUndefined }
});