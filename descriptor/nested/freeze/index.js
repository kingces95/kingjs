'use strict';

var isObject = require('@kingjs/is-object');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

function freezeNode(paths) {

  for (var name in paths) {

    freeze(
      this[name],
      paths[name]
    );
  }
}

function freeze(tree, paths) {

  if (!isObject(tree))
    return tree;

  Object.freeze(tree);

  if (!isObject(paths))
    return tree;

  paths = mergeWildcards.call(paths, tree, true);

  freezeNode.call(
    tree,
    paths
  );

  return tree;
}

Object.defineProperties(module, {
  exports: { value: freeze }
});