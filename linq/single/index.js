'use strict';

var where = require('@kingjs/linq.where');

function throwNoSingleMatch() {
  throw "single: sequence does not contain a single elements matching predicate.";
}

function single(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = where.call(enumerable, predicate);
  
  var enumerator = enumerable.getEnumerator();
  
  if (!enumerator.moveNext())
    throwNoSingleMatch();
  
  var result = enumerator.current;
  
  if (enumerator.moveNext())
    throwNoSingleMatch();
  
  return result;
};

Object.defineProperties(module, {
  exports: { value: single }
});
