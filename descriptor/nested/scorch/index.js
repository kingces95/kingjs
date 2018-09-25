'use strict';

var scorchObject = require('@kingjs/descriptor.scorch');
var update = require('@kingjs/descriptor.nested.update');

function scorchCallback(value, path) {
  return scorchObject.call(value, copyOnWrite);
}

function scorchUpdate(tree, paths, copyOnWrite) {
  return update(tree, path, scorchCallback, null, copyOnWrite);
}

Object.defineProperties(module, {
  exports: { value: scorchUpdate }
});