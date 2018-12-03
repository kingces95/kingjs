'use strict';

var is = require('@kingjs/is');

function initLambda(target, name) {

  if (is.string(this.get))
    this.get = new Function('return ' + this.get + ';');

  if (is.string(descriptor.set))
    this.set = new Function('value', this.set + ';');

  if (is.string(descriptor.value))
    this.value = new Function('return ' + this.value + ';');

  return this;
}

Object.defineProperties(module, {
  exports: { value: initLambda }
});