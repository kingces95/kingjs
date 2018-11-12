'use strict';

var write = require('@kingjs/descriptor.object.write');
var is = require('@kingjs/is');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');

function updateNode(
  paths,
  callback,
  thisArg,
  updateNodes) {

  var updatedThis = prolog.call(this);

  for (var name in paths) {

    if (name in this == false)
      continue;

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

  return epilog.call(updatedThis);
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