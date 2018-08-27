function returnThis() {
  return this;
}

Object.defineProperties(module, {
  exports: { value: returnThis }
});