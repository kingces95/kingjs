//'use strict';

var assert = require('@kingjs/assert');
var initThunk = require('./thunk')

function static(target, name) {

  var descriptor = initThunk.call(this, name);

  if (descriptor.function)
    return staticFunction.call(descriptor, target);

  return staticAccessor.call(descriptor, target);
}

function staticFunction(target) {
  assert(this.function);
  this.value = this.value.bind(target);
  return this;
}

function staticAccessor(target) {
  assert('value' in this == false);

  if (this.get)
    this.get = this.get.bind(target);

  if (this.set)
    this.set = this.set.bind(target);

  return this;
}

Object.defineProperties(module, {
  exports: { value: static }
});