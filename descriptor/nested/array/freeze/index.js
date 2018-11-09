'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var freezeHelper = require('@kingjs/descriptor.nested.freeze');

function freeze(tree) {
  var paths = toPaths(tree);
  return freezeHelper(tree, paths);
}

Object.defineProperties(module, {
  exports: { value: freeze }
});