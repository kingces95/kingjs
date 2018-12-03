'use strict';

function initField(target, name, value) {
  this.value = value;
  return this;
}

Object.defineProperties(module, {
  exports: { value: initField }
});