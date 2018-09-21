'use strict';

var create = require('@kingjs/descriptor.create');

function clear(name, copyOnWrite) {

  if (name in this == false)
    return this;

  if (name in Object.getPrototypeOf(this))
    copyOnWrite = true;

  var updatedThis = this;
  if (copyOnWrite || Object.isFrozen(this))
    updatedThis = create(updatedThis);

  delete updatedThis[name];
  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: clear }
});