'use strict';

function create(prototype) {
  if (prototype === undefined || prototype === null)
    return { };

  if (!Object.isFrozen(prototype))
    return Object.create(prototype);

  var clone = { };
  for (var name in prototype)
    clone[name] = prototype[name];
  return clone;
}

Object.defineProperties(module, {
  exports: { value: create }
});