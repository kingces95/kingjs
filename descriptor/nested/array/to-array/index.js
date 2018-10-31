'use strict';

var reduce = require('@kingjs/descriptor.nested.reduce');

function accumulate(array, leaf) {
  if (leaf === undefined)
    return array;
    
  if (!array)
    array = [];

  array.push(leaf);
  
  return array;
}

function toArray(tree, paths) {
  return reduce(tree, paths, accumulate, null);
}

Object.defineProperties(module, {
  exports: { value: toArray }
});