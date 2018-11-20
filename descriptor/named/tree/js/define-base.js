'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');

function defineBase(func, base) {
  assert(is.function(func));
  assert(is.function(base));
  
  func.prototype = Object.create(base.prototype);
  objectEx.setHiddenField(func.prototype, 'constructor', func);
  return func;
}

Object.defineProperties(module, {
  exports: { value: defineBase }
});