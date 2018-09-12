'use strict';

var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');
var isObject = require('@kingjs/is-object');

function toArray(result, tree, paths) {

  if (!isObject(paths)) {
    if (!result)
      result = [ ];

    result.push(tree);

    return result;
  }

  if (!isObject(tree))
    return result;

  paths = mergeWildcards.call(paths, tree, true);

  for (var name in paths)
    result = toArray(result, tree[name], paths[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths) {
      if (paths === undefined)
        return null;

      return toArray(null, tree, paths);
    }
  }
});