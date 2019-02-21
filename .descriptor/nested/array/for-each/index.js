'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var forEachHelper = require('@kingjs/descriptor.nested.for-each');

function forEach(tree, callback, thisArg) {
  var paths = toPaths(tree);
  return forEachHelper(tree, paths, callback, thisArg);
}

Object.defineProperties(module, {
  exports: { value: forEach }
});