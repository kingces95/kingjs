'use strict';

function initField(target, name, value) {
  this.value = value; // could be an object
  return this;
}

Object.defineProperties(module, {
  exports: { value: initField }
});