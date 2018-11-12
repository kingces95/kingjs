'use strict';

var is = require('@kingjs/is');
var update = require('@kingjs/descriptor.nested.update');
var scorchHelper = require('@kingjs/descriptor.scorch');

function callback(tree) {
  if (is.object(tree))
    tree = scorchHelper.call(tree);
  return tree;
}

callback.onNode = callback;

function scorch(tree, paths) {
  return update(tree, paths, callback, this);
}

Object.defineProperties(module, {
  exports: { value: scorch }
});
