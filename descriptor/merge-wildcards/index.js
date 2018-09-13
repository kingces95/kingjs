'use strict';

var write = require('@kingjs/descriptor.write');
var isEnumerable = require('@kingjs/is-enumerable');

var wildcardName = '*';

function mergeWildcards(target, value) {
  if (isEnumerable.call(this, wildcardName) == false)
    return this;

  var wildcard = this[wildcardName];

  target = write.clear.call(
    this, target, wildcardName
  ) || this;

  for (var name in value) {
    if (isEnumerable.call(target, name))
      continue;
    target[name] = wildcard;
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: write.define(mergeWildcards, 1) }
});