'use strict';

function filter(callbackOrNames, thisArg) {
  if (callbackOrNames instanceof Function)
    return filterProcedural.call(this, callbackOrNames, thisArg);

  return filterDeclarative.call(this, callbackOrNames);
}

function filterProcedural(callback, thisArg) {
  var result = null;

  for (var name in this) {
    var newName = callback.call(thisArg, name);
    if (newName === undefined)
      continue;

    if (!result)
      result = { };

    result[newName] = this[name];
  }

  return result;
}

function filterDeclarative(names) {
  var result = null;

  for (var name in names) {
    if (name in this == false)
      continue;

    if (!result)
      result = { };

    result[names[name]] = this[name];
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: filter }
});