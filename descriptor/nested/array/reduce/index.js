'use strict';

var toPaths = require('@kingjs/descriptor.nested.array.to-paths');
var reduceHelper = require('@kingjs/descriptor.nested.reduce');

function reduce(target, callback, accumulator, argThis) {
  var paths = toPaths(target);
  return reduceHelper(target, paths, callback, accumulator, argThis);
}

Object.defineProperties(module, {
  exports: { value: reduce }
});