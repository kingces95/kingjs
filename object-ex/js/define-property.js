'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var makeLazy = require('./make-lazy');

function defineProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  assert(descriptor);

  if (descriptor.lazy)
    descriptor = makeLazy.call(descriptor, name);

  if (target)
    Object.defineProperty(target, name, descriptor);

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: defineProperty }
});