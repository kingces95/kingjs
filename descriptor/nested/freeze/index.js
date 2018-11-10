'use strict';

var is = require('@kingjs/is');
var update = require('@kingjs/descriptor.nested.update');
var isFrozen = require('@kingjs/descriptor.is-frozen');
var freeze = require('@kingjs/descriptor.freeze');

function implicitFreeze(value) {
  if (!is.object(value))
    return;

  if (isFrozen.call(value))
    return;

  for (var key in value)
    implicitFreeze(value[key]);

    freeze.call(value);

  return value;
}

function callback(tree) {
  if (is.object(tree))
    Object.freeze(tree);
  return tree;
}

function explicitFreeze(tree, paths) {
  return update(tree, paths, callback, this, true);
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths) {
      implicitFreeze(tree);

      if (paths)
        explicitFreeze(tree, paths);
    }
  }
});