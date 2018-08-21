function pluck(descriptor) {
  for (var name in descriptor) {
    if (name in this == false)
      continue;

    descriptor[name] = this[name];
    delete this[name];
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: pluck }
});