'use strict';

function filter(callback, thisArg) {
  var result = null;

  for (var name in this) {
    var include = callback.call(thisArg, this[name], name);
    if (!include)
      continue;

    if (!result)
      result = { };

    result[name] = this[name];
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: filter }
});