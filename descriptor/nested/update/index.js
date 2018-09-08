'use strict';

var updateNode = require('../update-node');
var identity = require('@kingjs/func.return-arg-0');

function update(value, callback, tree, _, copyOnWrite) {

  if (!callback)
    callback = identity;

  if (!tree)
    tree = callback;

  if (tree instanceof Function) {

    if (!callback)
      callback = tree;

    return callback(value);
  }

  if (typeof value != 'object' || value == null)
    return value;

  return updateNode.call(
    value,
    update,
    callback,
    tree, 
    null,
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { 
    value: function(value, tree, callback, copyOnWrite) {
      return update(value, callback, tree, null, copyOnWrite);
    }
  }
});