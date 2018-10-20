'use strict';

var Dictionary = require('@kingjs/dictionary');

function create(prototype) {
  var clone = new Dictionary();

  if (prototype === undefined || prototype === null)
    return clone;

  for (var name in prototype)
    clone[name] = prototype[name];
    
  return clone;
}

Object.defineProperties(module, {
  exports: { value: create }
});