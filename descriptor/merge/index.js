function throwMergeConflict(left, right, name) {
  throw 'Merge conflict at "' + name + '".';
}

function merge(delta, resolve) {

  if (!resolve)
    resolve = throwMergeConflict;

  if (delta === undefined || delta == null)
    return this;

  var result = Object.isFrozen(this) ? null : this;

  for (var name in delta) {
    var value = delta[name];

    if (name in this) {
      var left = this[name];

      if (left === value)
        continue;

      value = resolve(left, value, name);

      if (left === value)
        continue;
    }

    if (result == null)
      result = Object.create(this);

    result[name] = value;
  }

  return result || this;
}

Object.defineProperties(module, {
  exports: { value: merge }
});