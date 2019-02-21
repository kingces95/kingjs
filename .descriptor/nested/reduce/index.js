'use strict';

var is = require('@kingjs/is');

var star = '*';

function getSubPaths(paths, name) {

  if (name in paths)
    return paths[name];

  if (star in paths)
    return paths[star];
}

function reduce(tree, paths, callback, accumulator, thisArg) {

  if (!is.object(paths)) {
    var result = callback.call(thisArg, accumulator, tree);
    if (is.undefined(result))
      result = accumulator;
    return result;
  }

  if (!is.object(tree))
    return accumulator;

  for (var name in tree) {
    var subPaths = getSubPaths(paths, name);
    if (is.undefined(subPaths))
      continue;
  
    accumulator = reduce(
      tree[name], 
      subPaths,
      callback, 
      accumulator, 
      thisArg
    );    
  }

  return accumulator;
}

Object.defineProperties(module, {
  exports: { value: reduce }
});