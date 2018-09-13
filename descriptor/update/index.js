'use strict';

var write = require('@kingjs/descriptor.write');

var copyOnWriteArgPosition = 1;

function updateEach(target, callback) {

  for (var key in this) {
    target = write.call(
      this, target, key, callback(this[key], key)
    );
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: write.define(updateEach, copyOnWriteArgPosition) }
});