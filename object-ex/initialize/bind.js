//'use strict';
var assert = require('assert');

var initThunk = require('./thunk')

function static(target, name) {

  var descriptor = initThunk.call(this, name);

  if (descriptor.function)
    staticFunction.call(descriptor, target);

  else
    staticAccessor.call(descriptor, target);
}

function staticFunction(target) {
  assert(this.function);
  this.value = this.value.bind(target);
}

function staticAccessor(target) {
  assert('value' in this == false);

  if (this.get)
    this.get = this.get.bind(target);

  if (this.set)
    this.set = this.set.bind(target);
}

module.exports = static;