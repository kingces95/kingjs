function mapNames(action) {
  if (action instanceof Function)
    return mapNamesProcedural.call(this, action);

  return mapNamesDeclarative.call(this, action);
}

function mapNamesProcedural(callback) {
  var result = null;

  for (var name in this) {
    var newName = callback(name);
    if (newName === undefined)
      continue;

    if (!result)
      result = { };

    result[newName] = this[name];
  }

  return result;
}

function mapNamesDeclarative(names) {
  var result = null;

  for (var name in names) {
    if (name in this == false)
      continue;

    if (!result)
      result = { };

    result[names[name]] = this[name];
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: mapNames }
});