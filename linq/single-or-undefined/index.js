'use strict';

var where = require('@kingjs/linq.where');

function singleOrUndefined(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = where.call(enumerable, predicate);
  
  var enumerator = enumerable.getEnumerator();
  
  if (!enumerator.moveNext())
    return undefined;
  
  var result = enumerator.current;
  
  if (enumerator.moveNext())
    result = undefined;
  
  return result;
};

Object.defineProperties(module, {
  exports: { value: singleOrUndefined }
});