'use strict';

var Dictionary = require('@kingjs/dictionary');
var setVersion = require('@kingjs/descriptor.version').set;

function create(prototype, version) {
  if (prototype === undefined || prototype === null)
    return new Dictionary();

  if (!alwaysCopy && !Object.isFrozen(prototype))
    return Object.create(prototype);

  var clone = new Dictionary();
  for (var name in prototype)
    clone[name] = prototype[name];
  return clone;
}

Object.defineProperties(module, {
  exports: { value: create }
});