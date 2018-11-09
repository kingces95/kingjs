'use strict';

function toPaths(target, callback, value) {

  if (callback(target)) {
    var path;

    if (target instanceof Array) {
      path = [ ];
      for (var i = 0; i < target.length; i++)
        path.push(toPaths(target[i], callback, value));
      return path;
    }

    path = { };
    for (var name in target)
      path[name] = toPaths(target[name], callback, value);
    return path;
  }

  return value;
}

Object.defineProperties(module, {
  exports: { value: toPaths }
});