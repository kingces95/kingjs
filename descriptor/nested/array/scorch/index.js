'use strict';

var scorchObject = require('@kingjs/descriptor.scorch');
var isObject = require('@kingjs/is-object');
var update = require('@kingjs/descriptor.nested.update');

function scorchCallback(tree) {
  if (isObject(tree))
    tree = scorchObject.call(tree);
  return tree;
}

function scorch(tree, paths) {
  return update(tree, paths, scorchCallback, this, true);
}

Object.defineProperties(module, {
  exports: { value: scorch }
});
