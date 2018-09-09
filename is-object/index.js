'use strict';

function isObject(value) {
  return typeof value == 'object' && value !== null;
}

Object.defineProperties(module, {
  exports: { value: isObject }
});