'use strict';

var is = require('@kingjs/is');
var update = require('@kingjs/descriptor.nested.update');
var scorchHelper = require('@kingjs/descriptor.scorch');

function scorchCallback(tree) {
  if (is.object(tree))
    tree = scorchHelper.call(tree);
  return tree;
}

function scorch(tree, paths) {
  return update(tree, paths, scorchCallback, this, true);
}

Object.defineProperties(module, {
  exports: { value: scorch }
});
