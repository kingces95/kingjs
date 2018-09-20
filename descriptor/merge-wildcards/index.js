'use strict';

var clear = require('@kingjs/descriptor.clear');

var wildcardName = '*';

function mergeWildcards(value, copyOnWrite) {
  var updatedThis = this;

  if (wildcardName in this == false)
    return this;

  var wildcard = this[wildcardName];

  var updatedThis = clear.call(
    this, updatedThis, wildcardName, copyOnWrite
  );

  for (var name in value) {
    if (name in updatedThis)
      continue;

    updatedThis[name] = wildcard;
  }

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: mergeWildcards }
});