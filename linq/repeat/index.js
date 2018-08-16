'use strict';

var defineGenerator = require('@kingjs/define-generator');

function repeat(element, count) {  
  return function() {
    
    if (count-- <= 0) {
      this.current_ = undefined;
      return false;
    }
    
    this.current_ = element;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(repeat) }
});