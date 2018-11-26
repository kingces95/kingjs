'use strict';

function bindThisArg(func, thisArg) {
  return function() {
    return func.apply(thisArg, arguments);
  }
}

Object.defineProperties(module, {
  exports: { value: bindThisArg }
});