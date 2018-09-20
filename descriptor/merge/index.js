'use strict';

var write = require('@kingjs/descriptor.write');

function throwMergeConflict(left, right, name) {
  throw 'Merge conflict at: ' + name;
}

function merge(delta, resolve, thisArg, copyOnWrite) {
  var thisUpdated = this;

  if (!resolve)
    resolve = throwMergeConflict;

  if (delta === undefined || delta == null)
    return thisUpdated;

  for (var name in delta) {
    var value = delta[name];
    var existingValue = this[name];

    if (existingValue !== value && existingValue !== undefined)
      value = resolve.call(thisArg, existingValue, value, name);

    thisUpdated = write.call(this, thisUpdated, name, value, copyOnWrite);
  }

  return thisUpdated;
}

Object.defineProperties(module, {
  exports: { value: merge }
});