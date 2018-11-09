'use strict';

var create = require('@kingjs/descriptor.create');

function write(key, value) {

  if (value === this[key] && (value !== undefined || key in this))
    return this;

  var updatedThis = this;
  if (Object.isFrozen(updatedThis))
    updatedThis = create(updatedThis);

  updatedThis[key] = value;

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: write }
});