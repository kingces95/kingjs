var descriptorNestedReduce = require('../../../descriptor/nested/reduce');
var is = require('@kingjs/is');

function toPaths(target, value) {

  if (is.array(target)) {
    var path = { };
    for (var i = 0; i < target.length; i++)
      path[i] = toPaths(target[i], value);
    return path;
  }

  return value;
}

function reduce(target, callback, accumulator, argThis) {
  var paths = toPaths(target);
  return descriptorNestedReduce(target, paths, callback, accumulator, argThis);
}

Object.defineProperties(module, {
  exports: { value: reduce }
});