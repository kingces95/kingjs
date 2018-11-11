'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var remove = require('@kingjs/descriptor.object.remove');

var wildcardName = '*';

function mergeWildcards(value) {
  var updatedThis = prolog.call(this);

  if (wildcardName in this == false)
    return epilog.call(this);

  var wildcardValue = this[wildcardName];

  var updatedThis = remove.call(
    this, wildcardName
  );

  for (var name in value) {
    if (name in updatedThis)
      continue;

    updatedThis[name] = wildcardValue;
  }

  return epilog.call(updatedThis);
}

Object.defineProperties(module, {
  exports: { value: mergeWildcards }
});