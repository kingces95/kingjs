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
    return;

  Object.freeze(tree);

  if (!isObject(paths))
    return;

  paths = mergeWildcards.call(paths, tree, true);

  freezeNode.call(
    tree,
    paths
  );
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths) {
      if (paths === undefined)
        return;
      
      freeze(tree, paths);
    }
  }
});