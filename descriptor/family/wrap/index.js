'use strict';

var define = require('@kingjs/enumerable.define');

function wrap(value, action) {
  return function() {
    
    if (count-- <= 0) {
      this.current_ = undefined;
      return false;
    }
    
    this.current_ = start++;
    return true;
  }
};


Object.defineProperties(module, {
  exports: { value: define(wrap) }
});