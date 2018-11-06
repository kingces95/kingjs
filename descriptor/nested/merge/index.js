'use strict';

var create = require(`@kingjs/descriptor.create`);
var write = require('@kingjs/descriptor.write');
var isObject = require('@kingjs/is-object');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

function throwMergeConflict(left, right) {
  throw 'Merge conflict';
}

function throwUnexpectedTreeLeaf(value) {
  throw 'Unexpected tree leaf: ' + value;
}

function throwUnexpectedDeltaLeaf(value) {
  throw 'Unexpected delta leaf: ' + value;
}

function mergeNode(
  delta,
  path,
  thisArg) {

  var updatedThis = this;

  for (var name in path) {

    var result = merge(
      this[name],
      delta[name],
      path[name],
      thisArg
    );

    updatedThis = write.call(
      updatedThis, name, result
    );
  }

  return updatedThis;
}

function merge(tree, delta, paths, thisArg) {

  if (paths == null || paths == undefined)
    paths = throwMergeConflict;

  if (paths instanceof Function) {

    if (tree === delta)
      return tree;

    if (tree === undefined)
      return delta;

    if (delta === undefined)
      return tree;

    return paths.call(thisArg, tree, delta);
  }

  if (delta !== undefined && !isObject(delta))
    throwUnexpectedDeltaLeaf(delta);

  if (tree !== undefined && !isObject(tree))
    throwUnexpectedTreeLeaf(tree);

  if (delta === undefined)
    return tree;

  if (tree === undefined)
    tree = create();

  paths = mergeWildcards.call(paths, delta);

  return mergeNode.call(
    tree,
    delta, 
    paths,
    thisArg
  );
}

Object.defineProperties(module, {
  exports: { value: merge }
});