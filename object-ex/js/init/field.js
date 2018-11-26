'use strict';

var assert = require('@kingjs/assert');

function initField(x, y) {
  assert('configurable' in this);
  assert('enumerable' in this);
  
  var value = y;
  
  this.value = value;
  return this;
}

Object.defineProperties(module, {
  exports: { value: initField }
});