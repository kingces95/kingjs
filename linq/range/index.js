'use strict';

var defineGenerator = require('@kingjs/define-generator');

function range(start, count) {    
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
  exports: { value: defineGenerator(range) }
});