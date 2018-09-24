'use strict';

function reduce(accumulator, callback, thisArg) {
  for (var key in this)
    accumulator = callback.call(thisArg, accumulator, this[key], key);
  return accumulator;
}

Object.defineProperties(module, {
  exports: { value: reduce }
});