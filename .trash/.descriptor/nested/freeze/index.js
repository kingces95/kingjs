'use strict';

var is = require('@kingjs/is');
var update = require('@kingjs/descriptor.nested.update');

function callback(tree) {
  if (is.object(tree))
    Object.freeze(tree);
  return tree;
}

callback.onNode = callback;

function freeze(tree, paths) {
  return update(tree, paths, callback, this);
}

Object.defineProperties(module, {
  exports: { value: freeze }
});