'use strict';

var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');
var is = require('@kingjs/is');

function reduce(tree, paths, callback, accumulator, thisArg) {

  if (!is.object(paths))
    return callback.call(thisArg, accumulator, tree);

  if (!is.object(tree))
    return accumulator;

  paths = mergeWildcards.call(paths, tree);

  for (var name in paths)
    accumulator = reduce(tree[name], paths[name], callback, accumulator, thisArg);

  return accumulator;
}

Object.defineProperties(module, {
  exports: { value: reduce }
});