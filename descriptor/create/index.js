'use strict';

var Dictionary = require('@kingjs/dictionary');

function create(prototype) {

  if (prototype === undefined || prototype === null)
    return new Dictionary();

  if (prototype instanceof Array)
    return prototype.slice();

  var clone = new Dictionary();

  for (var name in prototype)
    clone[name] = prototype[name];

  return clone;
}

Object.defineProperties(module, {
  exports: { value: create }
});