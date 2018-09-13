'use strict';

var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');
var isObject = require('@kingjs/is-object');

function reduce(accumulator, tree, paths, callback) {

  if (!isObject(paths)) 
    return callback(accumulator, tree);

  if (!isObject(tree))
    return accumulator;

  paths = mergeWildcards.call(paths, tree, true);

  for (var name in paths)
    accumulator = reduce(accumulator, tree[name], paths[name], callback);

  return accumulator;
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths, callback) {
      if (paths === undefined)
        return null;

      return reduce(null, tree, paths, callback);
    }
  }
});