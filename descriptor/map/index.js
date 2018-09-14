'use strict';

function reduce(callback) {
  var result = null;

  for (var key in this) {
    if (!result)
      result = { };

    result[key] = callback(this[key], key);
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: reduce }
});