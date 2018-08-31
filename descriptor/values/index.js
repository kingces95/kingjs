'use strict';

var define = require('@kingjs/enumerable.define');

function values(descriptor) {
  var keys = Object.keys(descriptor);
  var i = 0;

  return function() {
    
    if (i < keys.length)
      return false;
    
    if (!this.current_)
      this.current_ = { };

    var key = keys[i];

    this.current_.name = key;
    this.current_.value = descriptor[key];
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: define(values) }
});