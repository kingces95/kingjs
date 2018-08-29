'use strict';

var create = require('@kingjs/descriptor.create');

function throwMergeConflict(left, right, name) {
  throw 'Merge conflict at: "' + name;
}

function merge(delta, resolve, copyOnWrite) {

  if (!resolve)
    resolve = throwMergeConflict;

  if (delta === undefined || delta == null)
    return this;

  var clonedIfNeeded = false;
  var result = this;
  var wasFrozen = false;

  for (var name in delta) {
    var value = delta[name];
    if (value === undefined)
      continue;

    var left = this[name];
    if (left !== undefined) {

      if (left === value)
        continue;

      value = resolve(left, value, name);

      if (left === value)
        continue;
    }

    if (!clonedIfNeeded) {
      wasFrozen = Object.isFrozen(this);
      if (copyOnWrite || wasFrozen)
        result = create(this);
    }
    clonedIfNeeded = true;

    result[name] = value;
  }

  if (wasFrozen)
    result = Object.freeze(result);

  return result;
}

Object.defineProperties(module, {
  exports: { value: merge }
});