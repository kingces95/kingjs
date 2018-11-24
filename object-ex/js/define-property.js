'use strict';

var is = require('@kingjs/is');
var makeLazy = require('./make-lazy');
var initLambdas = require('./init-lambdas');

function defineProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  assert(descriptor);

  descriptor = initLambdas.call(descriptor);

  if (descriptor.lazy)
    descriptor = makeLazy.call(descriptor, name);

  if (target)
    Object.defineProperty(target, name, descriptor);

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: defineProperty }
});