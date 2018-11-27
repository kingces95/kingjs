'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineProperty = require('./property');

function defineStatic(target, name, descriptor) {
  assert(is.function(target));

  descriptor.configurable = false;

  defineProperty(
    target.prototype,
    name, 
    descriptor
  );
  
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineStatic }
});