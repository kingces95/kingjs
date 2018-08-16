'use strict';

var defineGenerator = require('@kingjs/define-generator');

function zip(other, result) {
  var first = this.getEnumerator();
  var second = other.getEnumerator();
  
  return function() {    
    if (!first.moveNext() || !second.moveNext())
      return false;
    
    this.current_ = result(first.current, second.current);
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(zip) }
});