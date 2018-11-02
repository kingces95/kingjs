'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var mergeHelper = require('@kingjs/descriptor.nested.merge');

function merge(tree, delta, callback, thisArg) {
  var paths = toPaths(delta, callback);
  return mergeHelper(tree, delta, paths, thisArg);
}

Object.defineProperties(module, {
  exports: { value: merge }
});