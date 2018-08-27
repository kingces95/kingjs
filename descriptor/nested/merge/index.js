var assert = require('@kingjs/assert');

function throwPathException(path, message) {
  throw message + ' at "' + path.join('.') + '".';
}

function throwMergeConflict(left, right, path) {

  if (left === undefined)
    return right;

  if (right === undefined)
    return left;
    
  throwPathException(path, 'Merge conflict');
}

function merge(path, target, source, resolve, copyOnWrite) {

  if (resolve == null || resolve == undefined)
    resolve = throwMergeConflict;

  if (resolve instanceof Function)
    return resolve.call(this, target, source, path);

  if (typeof resolve != 'object')
    throwPathException('Expected "resolve" to be an object or function', path);

  if (typeof source != 'object')
    throwPathException('Expected "source" to be an object', path);

  if (typeof target != 'object' && target !== undefined)    
    throwPathException('Expected "target" to be an object', path);

  var targetFrozen = target && Object.isFrozen(target);

  var cloned = false;
  for (name in resolve) {

    if (name in source == false)
      continue;

    var originalValue = target[value];

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

    if (!cloned && (copyOnWrite || targetFrozen)) {
      target = Object.create(target || null);
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
    value: function(target, source, resolve, copyOnWrite) {
      var path = [ ];
      return merge.call(this, path, target, source, resolve, copyOnWrite);
    }
  }
});