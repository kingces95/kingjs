'use strict';

var is = require('@kingjs/is');
var toPaths = require('@kingjs/descriptor.nested.to-paths');

function toPathsStub(target, value) {
  return toPaths(target, is.array, value);
}

Object.defineProperties(module, {
  exports: { value: toPathsStub }
});