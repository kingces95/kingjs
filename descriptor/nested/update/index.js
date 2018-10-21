'use strict';

var write = require('@kingjs/descriptor.write');
var isObject = require('@kingjs/is-object');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

function updateNode(
  paths,
  callback,
  thisArg) {

  var updatedThis = this;

  for (var name in paths) {

    var delta = update(
      this[name],
      paths[name],
      callback,
      thisArg
    );

    updatedThis = write.call(
      updatedThis, name, delta
    );
  }

  return updatedThis;
}

function update(tree, paths, callback, thisArg) {

  if (!isObject(paths))
    return callback.call(thisArg, tree, paths);

  if (!isObject(tree))
    return tree;

  paths = mergeWildcards.call(paths, tree);

  return updateNode.call(
    tree,
    paths,
    callback,
    thisArg
  );
}

Object.defineProperties(module, {
  exports: { value: update }
});