'use strict';

function keys() {
  var result = [];
  for (var key in this)
    result.push(key);
  return result;
}

Object.defineProperties(module, {
  exports: { value: keys }
});