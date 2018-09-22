'use strict';

var write = require('@kingjs/descriptor.write');
var isObject = require('@kingjs/is-object');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

function updateNode(
  paths,
  callback,
  thisArg,
  copyOnWrite) {

  var updatedThis = this;

  for (var name in paths) {

    var delta = update(
      this[name],
      paths[name],
      callback,
      thisArg,
      copyOnWrite
    );

    updatedThis = write.call(
      this, updatedThis, name, delta, copyOnWrite
    );
  }

  return updatedThis;
}

function update(tree, paths, callback, thisArg, copyOnWrite) {

  if (!isObject(paths))
    return callback.call(thisArg, tree, paths);

  if (!isObject(tree))
    return tree;

  paths = mergeWildcards.call(paths, tree, true);

  return updateNode.call(
    tree,
    paths,
    callback,
    thisArg,
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths, callback, thisArg, copyOnWrite) {
      if (paths === undefined || tree === undefined)
        return tree;

      return update(tree, paths, callback, thisArg, copyOnWrite);
    }
  }
});