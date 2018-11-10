var writableTag = Symbol.for('@kingjs/descriptor.writableTag');

function freeze() {
  delete this[writableTag];
  Object.freeze(this);
  return this;
}

Object.defineProperties(module, {
  exports: { value: freeze }
});