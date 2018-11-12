'use strict';

var write = require('@kingjs/descriptor.object.write');
var is = require('@kingjs/is');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');

var star = '*';

function updateNode(
  paths,
  callback,
  thisArg,
  updateNodes) {

  var updatedThis = prolog.call(this);
  
  var path;
  for (var name in this) {

    if (name in paths)
      path = paths[name];
    else if (star in paths)
      path = paths[star];
    else
      continue;

    var delta = update(
      this[name],
      path,
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