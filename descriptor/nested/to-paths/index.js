'use strict';

function toPaths(target, callback, value) {

  if (callback(target)) {
    var path = { };
    for (var name in target)
      path[name] = toPaths(target[name], callback, value);
    return path;
  }

  return value;
}

Object.defineProperties(module, {
  exports: { value: toPaths }
});