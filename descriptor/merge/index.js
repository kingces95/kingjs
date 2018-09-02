'use strict';

var update = require('@kingjs/descriptor.update');

function throwMergeConflict(left, right, name) {
  throw 'Merge conflict at: "' + name;
}

function merge(target, delta, resolve) {

  if (!resolve)
    resolve = throwMergeConflict;

  if (delta === undefined || delta == null)
    return target;

  for (var name in delta) {
    var newValue = delta[name];
    if (newValue === undefined)
      continue;

    var existingValue = this[name];
    if (existingValue !== undefined) {

      if (existingValue === newValue)
        continue;

      newValue = resolve(existingValue, newValue, name);
    }

    target = update.call(this, target, name, newValue);
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: update.define(merge, 2) }
});