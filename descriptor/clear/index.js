'use strict';

var create = require('@kingjs/descriptor.create');

function clear(name, copyOnWrite) {

  if (name in this == false)
    return this;

  var prototype = Object.getPrototypeOf(this);
  if (prototype && name in prototype)
    copyOnWrite = true;

  var updatedThis = this;
  if (copyOnWrite || Object.isFrozen(this))
    updatedThis = create(updatedThis, true);

  delete updatedThis[name];
  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: clear }
});