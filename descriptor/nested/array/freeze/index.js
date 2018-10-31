'use strict';

var isObject = require('@kingjs/is-object');
var update = require('@kingjs/descriptor.nested.update');

function freezeCallback(tree) {
  if (isObject(tree))
    Object.freeze(tree);
  return tree;
}

function freezeWithUpdate(tree, paths) {
  return update(tree, paths, freezeCallback, this, true);
}

Object.defineProperties(module, {
  exports: { value: freezeWithUpdate }
});