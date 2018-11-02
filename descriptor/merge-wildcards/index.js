'use strict';

var remove = require('@kingjs/descriptor.remove');

var wildcardName = '*';

function mergeWildcards(value) {
  var updatedThis = this;

  if (wildcardName in this == false)
    return this;

  var wildcard = this[wildcardName];

  var updatedThis = remove.call(
    this, wildcardName
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