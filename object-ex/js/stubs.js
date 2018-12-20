//'use strict';

function initStubs(stub) {
  if ('value' in this)
    this.value = stub;

  if ('get' in this)
    this.get = stub;

  if ('set' in this)
    this.set = stub;

  return this;
}

Object.defineProperties(module, {
  exports: { value: initStubs }
});