'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var write = require('@kingjs/descriptor.object.write');

function throwMergeConflict(left, right, name) {
  throw 'Merge conflict at: ' + name;
}

function merge(delta, callback, thisArg) {
  var thisUpdated = prolog.call(this);

  if (!callback)
    callback = throwMergeConflict;

  if (delta === undefined || delta == null)
    return epilog.call(thisUpdated);

  for (var name in delta) {
    var value = delta[name];
    var existingValue = this[name];

    if (existingValue !== value && existingValue !== undefined)
      value = callback.call(thisArg, existingValue, value, name);

    thisUpdated = write.call(thisUpdated, name, value);
  }

  return epilog.call(thisUpdated);
}

Object.defineProperties(module, {
  exports: { value: merge }
});