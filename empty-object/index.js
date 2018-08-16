var emptyObject = { };

Object.freeze(emptyObject);

Object.defineProperties(module, {
  exports: { value: emptyObject }
});