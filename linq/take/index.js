'use strict';

var defineGenerator = require('@kingjs/define-generator');

function take(count) {
  var enumerator = this.getEnumerator();
  
  return function() {    
    if (!enumerator.moveNext() || count-- <= 0)
      return false;
    
    this.current_ = enumerator.current;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(take) }
});