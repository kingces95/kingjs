'use strict';

function reduce(callback, result) {
  for (var key in this)
    result = callback(result, this[key], key);
}

Object.defineProperties(module, {
  exports: { value: reduce }
});