//'use strict';

function initStub(name) {
  Object.defineProperty(this, 'name', {
    value: `${name.toString()} (${this.name})`
  });
  return this;
}

Object.defineProperties(module, {
  exports: { value: initStub }
});