'use strict';

var isObject = require('@kingjs/is-object');
var update = require('@kingjs/descriptor.nested.update');

function callback(tree) {
  if (isObject(tree))
    Object.freeze(tree);
  return tree;
}

function freeze(tree, paths) {
  return update(tree, paths, callback, this, true);
}

Object.defineProperties(module, {
  exports: { value: freeze }
});