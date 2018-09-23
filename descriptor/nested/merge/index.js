'use strict';

var create = require(`@kingjs/descriptor.create`);
var write = require('@kingjs/descriptor.write');
var isObject = require('@kingjs/is-object');

function throwMergeConflict(left, right, copyOnWrite) {
  throw 'Merge conflict';
}

function mergeNode(
  delta,
  path,
  thisArg, 
  copyOnWrite) {

  var updatedThis = this;

  for (var name in path) {

    var result = merge(
      this[name],
      delta[name],
      path[name],
      thisArg, 
      copyOnWrite
    );

    updatedThis = write.call(
      this, updatedThis, name, result, copyOnWrite
    );
  }

  return updatedThis;
}

function merge(tree, delta, paths, thisArg, copyOnWrite) {

  if (paths == null || paths == undefined)
    paths = throwMergeConflict;

  if (paths instanceof Function) {

    if (tree === delta)
      return tree;

    if (tree === undefined)
      return delta;

    if (delta === undefined)
      return tree;

    return paths.call(thisArg, tree, delta, copyOnWrite);
  }

  if (!isObject(delta))
    return tree;

  if (tree === undefined)
    tree = create();

  if (!isObject(tree))
    return tree;

  return mergeNode.call(
    tree,
    delta, 
    paths,
    thisArg, 
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { value: merge }
});