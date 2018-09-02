'use strict';

var update = require('@kingjs/descriptor.update');

function map(target, action) {

  for (var key in this) {
    target = update.call(
      this, target, key, action(this[key], key)
    );
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: update.define(map, 1) }
});