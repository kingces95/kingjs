'use strict';

var update = require('@kingjs/descriptor.update');

function map(target, callback) {

  for (var key in this) {
    target = update.call(
      this, target, key, callback(this[key], key)
    );
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: update.define(map, 1) }
});