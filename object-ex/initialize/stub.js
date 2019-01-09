//'use strict';

function initializeStub(name) {
  Object.defineProperty(this, 'name', {
    value: `${name.toString()} (${this.name})`
  });
  return this;
}

module.exports = initializeStub;