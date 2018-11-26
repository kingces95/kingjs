'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var initReference = require('../init/reference');

function defineReference(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  assert(descriptor);
  
  descriptor = initReference.call(descriptor, name);

  if (target)
    Object.defineProperty(target, name, descriptor);

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: defineReference }
});