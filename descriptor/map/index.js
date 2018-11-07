'use strict';

var write = require('@kingjs/descriptor.write');

function reduce(callback, thisArg) {
  var result = null;
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
  exports: { value: reduce }
});