'use strict';

var reduce = require('@kingjs/descriptor.nested.array.reduce');

function accumulate(array, leaf) {
  if (leaf === undefined)
    return array;
    
  if (!array)
    array = [];

  array.push(leaf);
  
  return array;
}

function toArray(tree) {
  return reduce(tree, accumulate, null);
}

Object.defineProperties(module, {
  exports: { value: toArray }
});