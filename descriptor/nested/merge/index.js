'use strict';

var is = require('@kingjs/is');
var Dictionary = require(`@kingjs/dictionary`);
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var write = require('@kingjs/descriptor.object.write');
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

  var updatedThis = prolog.call(this);

  for (var name in path) {

    if (name in delta == false &&
      name in this == false)
      continue;

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

  return epilog.call(updatedThis);
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

  if (delta !== undefined && !is.object(delta))
    throwUnexpectedDeltaLeaf(delta);

  if (tree !== undefined && !is.object(tree))
    throwUnexpectedTreeLeaf(tree);

  if (delta === undefined)
    return tree;

  if (tree === undefined)
    tree = paths instanceof Array ? [ ] : new Dictionary();

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