'use strict';

var write = require('@kingjs/descriptor.write');
var is = require('@kingjs/is');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

function updateNode(
  paths,
  callback,
  thisArg,
  updateNodes) {

  var updatedThis = this;

  for (var name in paths) {
    var delta = update(
      this[name],
      paths[name],
      callback,
      thisArg,
      updateNodes
    );

    updatedThis = write.call(
      updatedThis, name, delta
    );
  }

  return updatedThis;
}

function update(tree, paths, callback, thisArg, updateNodes) {

  if (!is.object(paths))
    return callback.call(thisArg, tree, paths);

  if (!is.object(tree))
    return tree;

  paths = mergeWildcards.call(paths, tree);

  var result = updateNode.call(
    tree,
    paths,
    callback,
    thisArg,
    updateNodes
  );

  if (updateNodes)
    result = callback.call(thisArg, result, paths);

  return result;
}

Object.defineProperties(module, {
  exports: { value: update }
});