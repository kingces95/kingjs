'use strict';

var descriptor = {
  write: require('@kingjs/descriptor.write'),
  isFrozen: require('@kingjs/descriptor.is-frozen')
}
var singleton = { };

function deleteOrShiftPop(key) {

  if (this instanceof Array) {
    key = Number(key);
    
    while (key != this.length - 1) {
      this[key] = this[key + 1];
      key++;
    }
     
    this.pop();
    return;
  }

  delete this[key];
}

function remove(key) {

  if (key in this == false)
    return this;

  var isFrozen = descriptor.isFrozen.call(this);

  var mutableThis = this;

  if (isFrozen) {
    // small hack; writing a value guaranteed to be different than 
    // the existing value will force write to clone the descriptor.
    mutableThis = descriptor.write.call(this, key, singleton);
  }

  deleteOrShiftPop.call(mutableThis, key);

  return mutableThis;
}

Object.defineProperties(module, {
  exports: { value: remove }
});