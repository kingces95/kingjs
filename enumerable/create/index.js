'use strict';

var define = require('@kingjs/enumerable.define');

function create() {
  var array = arguments;
  var index = -1;

  return function moveNext() {
    if (index + 1 == array.length)
      return false;

    this.current_ = array[++index];
    return true;
  }
}

Object.defineProperties(module, {
  exports: { value: define(create) }
});