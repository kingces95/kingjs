function returnArg0() {
  return arguments[0];
}

Object.defineProperties(module, {
  exports: { value: returnArg0 }
});