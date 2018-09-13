'use strict';

var update = require('@kingjs/descriptor.update');

var copyOnWriteArgPosition = 1;

function updateEach(target, callback) {

  for (var key in this) {
    target = update.call(
      this, target, key, callback(this[key], key)
    );
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: update.define(updateEach, copyOnWriteArgPosition) }
});