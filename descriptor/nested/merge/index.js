'use strict';

var create = require('@kingjs/descriptor.create');

function throwPathException(path, message) {
  throw message + ' at: ' + path.join('.');
}

function throwMergeConflict(left, right, path) {
  throwPathException(path, 'Merge conflict');
}

function merge(path, target, delta, resolve, copyOnWrite) {

  if (resolve == null || resolve == undefined)
    resolve = throwMergeConflict;

  if (resolve instanceof Function) {
    if (target === delta)
      return target;

    if (target === undefined)
      return delta;

    if (delta === undefined)
      return target;

    return resolve.call(this, target, delta, path);
  }

  if (typeof resolve != 'object')
    throwPathException(path, 'Expected "resolve" to be an object or function');

  if (typeof delta != 'object' && delta !== undefined)
    throwPathException(path, 'Expected "delta" to be an object');

  if (typeof target != 'object' && target !== undefined)
    throwPathException(path, 'Expected "target" to be an object');

  if (delta === undefined)
    return target;

  var targetFrozen = target && Object.isFrozen(target);

  var clonedIfNeeded = false;
  for (var name in resolve) {

    if (name in delta == false)
      continue;

    var originalValue = target ? target[name] : undefined;

    path.push(name);
    var mergeValue = merge.call(
      this,
      path,
      originalValue,
      delta[name],
      resolve[name],
      copyOnWrite
    );
    path.pop();

    if (originalValue === mergeValue)
      continue;

    if (!clonedIfNeeded && (!target || copyOnWrite || targetFrozen))
      target = create(target);
    clonedIfNeeded = true;

    target[name] = mergeValue;
  }

  if (targetFrozen)
    Object.freeze(target);

  return target;
}

Object.defineProperties(module, {
  exports: {
    value: function (target, source, resolve, copyOnWrite) {
      var path = [];
      return merge.call(this, path, target, source, resolve, copyOnWrite);
    }
  }
});