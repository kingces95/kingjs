'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var toArrayHelper = require('@kingjs/descriptor.nested.to-array');

function toArray(tree) {
  var paths = toPaths(tree);
  return toArrayHelper(tree, paths);
}

Object.defineProperties(module, {
  exports: { value: toArray }
});