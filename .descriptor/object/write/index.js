'use strict';

var isFrozen = require('@kingjs/descriptor.object.is-frozen');
var clone = require('@kingjs/descriptor.object.clone');

function write(key, value) {

  if (value === this[key] && (value !== undefined || key in this))
    return this;

  var updatedThis = this;
  
  if (isFrozen.call(this))
    updatedThis = clone.call(this);

  updatedThis[key] = value;

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: write }
});