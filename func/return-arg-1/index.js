function returnArg1() {
  return arguments[1];
}

Object.defineProperties(module, {
  exports: { value: returnArg1 }
});