'use strict';

var is = require('@kingjs/is');

function reduce(tree, callback, accumulator, thisArg) {

  if (!is.array(tree)) {
    var result = callback.call(thisArg, accumulator, tree);
    if (is.undefined(result))
      result = accumulator;
    return result;
  }

  for (var name = 0; name < tree.length; name ++) {
      accumulator = reduce(
      tree[name], 
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