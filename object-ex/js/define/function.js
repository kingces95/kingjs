'use strict';

var is = require('@kingjs/is');
var defineProperty = require('./property');
var bindLazy = require('../bind-lazy');
var bindThis = require('../bind-this');

function defineFunction(target, name, descriptor) {
  descriptor = initLambdas.call(descriptor);        

  var value = descriptor.value;

  if (is.string(value))
    value = new Function('return ' + value + ';');

  var thisArg = descriptor.thisArg;
  if (thisArg && value)
    value = bindThis(value, thisArg);
  
  if (descriptor.lazy)
    value = bindLazy.call(value, name, descriptor.enumerable);
    
  descriptor.value = value;

  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineFunction }
});