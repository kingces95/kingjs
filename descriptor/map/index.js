'use strict';

function reduce(callback, thisArg) {
  var result = null;

  for (var key in this) {
    if (!result)
      result = { };

    result[key] = callback.call(thisArg, this[key], key);
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: reduce }
});