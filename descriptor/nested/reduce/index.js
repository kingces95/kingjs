'use strict';

var is = require('@kingjs/is');

var star = '*';

function reduce(tree, paths, callback, accumulator, thisArg) {

  if (!is.object(paths))
    return callback.call(thisArg, accumulator, tree);

  if (!is.object(tree))
    return accumulator;

  var path;
  for (var name in tree) {

    if (name in paths)
      path = paths[name];
    else if (star in paths)
      path = paths[star];
    else
      continue;

    accumulator = reduce(
      tree[name], 
      path,
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