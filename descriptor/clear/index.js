'use strict';

var create = require('@kingjs/descriptor.create');

function clear(name) {

  if (name in this == false)
    return this;

  var copyOnWrite = Object.isFrozen(this);

  if (!copyOnWrite) {
    var prototype = Object.getPrototypeOf(this);
    if (prototype && name in prototype)
      copyOnWrite = true;
  }

  var updatedThis = this;
  if (copyOnWrite)
    updatedThis = create(updatedThis);

  delete updatedThis[name];
  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: clear }
});