var writableSymbol = require('@kingjs/descriptor.writable-symbol');

function freeze() {
  delete this[writableSymbol];
  Object.freeze(this);
  return this;
}

Object.defineProperties(module, {
  exports: { value: freeze }
});