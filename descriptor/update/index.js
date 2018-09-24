'use strict';

var write = require('@kingjs/descriptor.write');

function update(callback, thisArg, copyOnWrite) {
  var thisUpdated = this;

  for (var key in this) {
    var value = callback.call(thisArg, this[key], key);
    thisUpdated = write.call(
      this, thisUpdated, key, value, copyOnWrite
    );
  }

  return thisUpdated;
}

Object.defineProperties(module, {
  exports: { value: update }
});