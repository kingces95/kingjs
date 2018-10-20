'use strict';

var scorchObject = require('@kingjs/descriptor.scorch');
var update = require('@kingjs/descriptor.nested.update');

function scorchCallback(value) {
  return scorchObject.call(value);
}

function scorchUpdate(tree, paths) {
  return update(tree, paths, scorchCallback);
}

Object.defineProperties(module, {
  exports: { value: scorchUpdate }
});