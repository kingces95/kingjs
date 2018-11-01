'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var updateHelper = require('@kingjs/descriptor.nested.update');

function update(tree, callback, thisArg) {
  var paths = toPaths(tree);
  return updateHelper(tree, paths, callback, thisArg);
}

Object.defineProperties(module, {
  exports: { value: update }
});