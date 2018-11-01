'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var mergeHelper = require('@kingjs/descriptor.nested.merge');

function merge(tree, delta, thisArg) {
  var paths = toPaths(tree);
  return mergeHelper(tree, delta, paths, thisArg);
}

Object.defineProperties(module, {
  exports: { value: merge }
});