'use strict';

var assert = require('@kingjs/assert');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

function prolog() {
  assert(isFrozen.call(this));
  return this;
}

Object.defineProperties(module, {
  exports: { value: prolog }
});