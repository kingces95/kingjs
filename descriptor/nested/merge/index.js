'use strict';

var create = require('@kingjs/descriptor.create')

function throwPathException(path, message) {
  throw message + ' at: ' + path.join('.');
}

function throwMergeConflict(left, right, path) {
  throwPathException(path, 'Merge conflict');
}

function merge(path, target, source, resolve, copyOnWrite) {

  if (resolve == null || resolve == undefined)
    resolve = throwMergeConflict;

  if (resolve instanceof Function) {
    if (target === source)
      return target;

    if (target === undefined)
      return source;

    if (source === undefined)
      return target;

    return resolve.call(this, target, source, path);
  }

  if (typeof resolve != 'object')
    throwPathException(path, 'Expected "resolve" to be an object or function');

  if (typeof source != 'object' && source !== undefined)
    throwPathException(path, 'Expected "source" to be an object');

  if (typeof target != 'object' && target !== undefined)
    throwPathException(path, 'Expected "target" to be an object');

  if (source === undefined)
    return target;

  var targetFrozen = target && Object.isFrozen(target);

  var cloned = false;
  for (var name in resolve) {

    if (name in source == false)
      continue;

    var originalValue = target ? target[name] : undefined;

    path.push(name);
    var mergeValue = merge.call(
      this,
      path,
      originalValue,
      source[name],
      resolve[name],
      copyOnWrite
    );
    path.pop();

    if (originalValue === mergeValue)
      continue;

    if (!cloned && (!target || copyOnWrite || targetFrozen)) {
      target = create(target);
      cloned = true;
    }

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