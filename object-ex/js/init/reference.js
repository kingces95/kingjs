'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function initReference(name, dereference, defaultAddress) {
  assert('configurable' in this);
  assert('enumerable' in this);
  assert(is.function(dereference));

  return this;
}

Object.defineProperties(module, {
  exports: { value: initReference }
});