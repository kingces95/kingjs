function copy(source, skipOnDefined) {

  if (source === undefined || source == null)
    return this;

  for (var name in source) {
    if (skipOnDefined && name in this) {
      if (skipOnDefined === true || skipOnDefined(name))
        continue;
    }

    this[name] = source[name];
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: copy }
});