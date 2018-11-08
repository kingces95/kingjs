'use strict';

var write = require('@kingjs/descriptor.write');

function throwMergeConflict(left, right, name) {
  throw 'Merge conflict at: ' + name;
}

function merge(delta, callback, thisArg) {
  var thisUpdated = this;

  if (!callback)
  callback = throwMergeConflict;

  if (delta === undefined || delta == null)
    return thisUpdated;

  for (var name in delta) {
    var value = delta[name];
    var existingValue = this[name];

    if (existingValue !== value && existingValue !== undefined)
      value = callback.call(thisArg, existingValue, value, name);

    thisUpdated = write.call(thisUpdated, name, value);
  }

  return thisUpdated;
}

Object.defineProperties(module, {
  exports: { value: merge }
});