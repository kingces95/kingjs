'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

function defineProperty(target, name, descriptor) {
  assert(target);
  assert(is.stringOrSymbol(name));
  assert(descriptor);

  Object.defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineProperty }
});