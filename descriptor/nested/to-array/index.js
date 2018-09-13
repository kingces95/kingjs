'use strict';

var reduce = require('@kingjs/descriptor.nested.reduce');

function accumulate(array, leaf) {
  if (!array)
    array = [];
  array.push(leaf);
  return array;
}

function toArray(tree, paths) {
  return reduce(tree, paths, accumulate);
}

Object.defineProperties(module, {
  exports: { value: toArray }
});