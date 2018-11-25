'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var makeLazy = require('./make-lazy');
var makeStatic = require('./make-static');

function defineProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  assert(descriptor);

  if (descriptor.lazy)
    descriptor = makeLazy.call(descriptor, name);

  Object.defineProperty(target, name, descriptor);

  assert(target);
  if (descriptor.static) {
    assert(is.function(target));
    descriptor = makeStatic.call(descriptor, target);
    Object.defineProperty(target.prototype, name, descriptor);
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: defineProperty }
});