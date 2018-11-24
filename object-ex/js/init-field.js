'use strict';

var assert = require('@kingjs/assert');

function initField(name, value) {
  assert('configurable' in this);
  assert('enumerable' in this);
  
  this.value = value;
  return this;
}

Object.defineProperties(module, {
  exports: { value: initField }
});