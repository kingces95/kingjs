'use strict';

var Dictionary = require('@kingjs/dictionary');
var isFrozen = require('@kingjs/descriptor.is-frozen');

var writableTag = Symbol.for('@kingjs/descriptor.writableTag');

function shallowCopy() {

  var clone;

  if (this instanceof Array) {
    clone = this.slice();
  } 
  
  else {
    var clone = new Dictionary();
    for (var name in this)
      clone[name] = this[name];
  }

  clone[writableTag] = undefined;

  return clone;
}

function write(key, value) {

  if (value === this[key] && (value !== undefined || key in this))
    return this;

  var updatedThis = this;
  
  if (isFrozen.call(this))
    updatedThis = shallowCopy.call(this);

  updatedThis[key] = value;

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: write }
});