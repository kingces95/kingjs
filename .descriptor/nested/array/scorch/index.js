'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var scorchHelper = require('@kingjs/descriptor.nested.scorch');

function scorch(tree) {
  var paths = toPaths(tree);
  return scorchHelper(tree, paths);
}

Object.defineProperties(module, {
  exports: { value: scorch }
});
