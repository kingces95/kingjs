'use strict';

var create = require('@kingjs/descriptor.create');
var snapshot = require('@kingjs/descriptor.snapshot');

var $version = Symbol.for('@kingjs/descriptor.write');

function touch(version) {

  if (version === undefined)
    version = snapshot();

  if (this[$version] === version && !Object.isFrozen(this)) 
    return this;
  
  var updatedThis = create(updatedThis);

  updatedThis[$version] = version;

  return updatedThis;
}

function write(key, value, version) {

  if (value === this[key] && (value !== undefined || key in this))
    return this;

  var updatedThis = touch.call(this, version);

  updatedThis[key] = value;

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: write }
});