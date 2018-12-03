'use strict';

var initStubs = require('../init/stubs');
var initLambda = require('../init/lambda');
var initStatic = require('../init/static');

function defineFunction(target, name, descriptor) {
  descriptor = initLambda.call(descriptor, target, name);
  descriptor = initStatic.call(descriptor, target, name);
  descriptor = initStubs.call(descriptor, target, name);
  Object.defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});