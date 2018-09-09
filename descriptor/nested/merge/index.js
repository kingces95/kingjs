'use strict';

var updateDescriptor = require('@kingjs/descriptor.update');
var isObject = require('@kingjs/is-object');

function throwMergeConflict(left, right, copyOnWrite) {
  throw 'Merge conflict';
}

var mergeNode = updateDescriptor.define(
  function(
    target,
    update,
    resolve,
    copyOnWrite) {
  
    for (var name in resolve) {
  
      var result = merge(
        this[name],
        update[name],
        resolve[name],
        copyOnWrite
      );
  
      target = updateDescriptor.call(
        this, target, name, result
      );
    }
  
    return target;
  }, 2
);

function merge(value, update, resolve, copyOnWrite) {

  if (resolve == null || resolve == undefined)
    resolve = throwMergeConflict;

  if (resolve instanceof Function) {

    if (value === update)
      return value;

    if (value === undefined)
      return update;

    if (update === undefined)
      return value;

    return resolve(value, update, copyOnWrite);
  }

  if (!isObject(update))
    return value;

  if (value === undefined)
    value = { };

  if (!isObject(value))
    return value;

  return mergeNode.call(
    value,
    update, 
    resolve,
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { value: merge }
});