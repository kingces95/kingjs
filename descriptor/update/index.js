'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var write = require('@kingjs/descriptor.object.write');

function update(callback, thisArg) {
  var thisUpdated = prolog.call(this);

  for (var key in this) {
    var value = callback.call(thisArg, this[key], key);
    thisUpdated = write.call(
      thisUpdated, key, value
    );
  }

  return epilog.call(thisUpdated);
}

Object.defineProperties(module, {
  exports: { value: update }
});