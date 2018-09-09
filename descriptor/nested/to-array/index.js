'use strict';

var mergeWildcards = require('../merge-wildcards');
var isObject = require('../../../is-object');

function toArray(result, value, tree) {

  if (!isObject(tree)) {
    if (!result)
      result = [ ];

    result.push(value);

    return result;
  }

  if (!isObject(value))
    return result;

  tree = mergeWildcards(tree, value);

  for (var name in tree)
    result = toArray(result, value[name], tree[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { 
    value: function(value, tree) {
      if (tree === undefined)
        return null;

      return toArray(null, value, tree);
    }
  }
});