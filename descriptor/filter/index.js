'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');

function filter(callbackOrNames, thisArg) {
  prolog.call(this);

  var result = callbackOrNames instanceof Function ?
    filterProcedural.call(this, callbackOrNames, thisArg) :
    filterDeclarative.call(this, callbackOrNames);

  return epilog.call(result);
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