'use strict';

var write = require('@kingjs/descriptor.write');
var isObject = require('@kingjs/is-object');

function throwMergeConflict(left, right, copyOnWrite) {
  throw 'Merge conflict';
}

var copyOnWriteArgPosition = 2;

var mergeNode = write.define(
  function(
    target,
    delta,
    path,
    copyOnWrite) {
  
    for (var name in path) {
  
      var result = merge(
        this[name],
        delta[name],
        path[name],
        copyOnWrite
      );
  
      target = write.call(
        this, target, name, result
      );
    }
  
    return target;
  }, copyOnWriteArgPosition
);

function merge(tree, delta, paths, copyOnWrite) {

  if (paths == null || paths == undefined)
    paths = throwMergeConflict;

  if (paths instanceof Function) {

    if (tree === delta)
      return tree;

    if (tree === undefined)
      return delta;

    if (delta === undefined)
      return tree;

    return paths(tree, delta, copyOnWrite);
  }

  if (!isObject(delta))
    return tree;

  if (tree === undefined)
    tree = { };

  if (!isObject(tree))
    return tree;

  return mergeNode.call(
    tree,
    delta, 
    paths,
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { value: merge }
});