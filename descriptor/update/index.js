'use strict';

var write = require('@kingjs/descriptor.write');

function update(callback, thisArg) {
  var thisUpdated = this;

  for (var key in this) {
    var value = callback.call(thisArg, this[key], key);
    thisUpdated = write.call(
      thisUpdated, key, value
    );
  }

  return thisUpdated;
}

Object.defineProperties(module, {
  exports: { value: update }
});