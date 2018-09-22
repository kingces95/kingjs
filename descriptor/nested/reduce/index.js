'use strict';

var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');
var isObject = require('@kingjs/is-object');

function reduce(tree, paths, callback, accumulator, thisArg) {

  if (!isObject(paths)) {
    if (accumulator === undefined)
      accumulator = tree;
    return callback.call(thisArg, accumulator, tree);
  }

  if (!isObject(tree))
    return accumulator;

  paths = mergeWildcards.call(paths, tree, true);

  for (var name in paths)
    accumulator = reduce(tree[name], paths[name], callback, accumulator, thisArg);

  return accumulator;
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths, callback, initialValue, thisArg) {
      if (tree === undefined || paths === undefined)
        return initialValue;

      return reduce(tree, paths, callback, initialValue, thisArg);
    }
  }
});