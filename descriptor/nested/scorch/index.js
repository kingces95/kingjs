'use strict';

var scorchObject = require('@kingjs/descriptor.scorch');
var is = require('@kingjs/is');
var update = require('@kingjs/descriptor.nested.update');

function scorchCallback(tree) {
  if (is.object(tree))
    tree = scorchObject.call(tree);
  return tree;
}

function scorch(tree, paths) {
  return update(tree, paths, scorchCallback, this, true);
}

Object.defineProperties(module, {
  exports: { value: scorch }
});
