function scorch() {

  for (var name in this) {
    if (this[name] === undefined)
      delete this[name];
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: scorch }
});