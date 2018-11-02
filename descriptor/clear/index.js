'use strict';

var create = require('@kingjs/descriptor.create');

function shouldCopyOnWrite(isArray, key) {

  if (Object.isFrozen(this))
    return true;

  // array case
  if (isArray)
    return key != this.length - 1;

  return false;
}

function clearKey(isArray, key) {

  // array case
  if (isArray) {
    while (key != this.length - 1) {
      this[key] = this[key + 1];
      key++;
    }
     
    this.pop();
    return;
  }

  delete this[key];
}

function clear(key) {

  var isArray = this instanceof Array;

  if (key in this == false)
    return this;

  var copyOnWrite = shouldCopyOnWrite.call(this, isArray, key);

  if (!copyOnWrite) {
    var prototype = Object.getPrototypeOf(this);
    if (prototype && key in prototype)
      copyOnWrite = true;
  }

  var updatedThis = this;
  if (copyOnWrite)
    updatedThis = create(updatedThis);

  clearKey.call(updatedThis, isArray, key);
  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: clear }
});