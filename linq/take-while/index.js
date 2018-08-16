'use strict';

var defineGenerator = require('@kingjs/define-generator');

function takeWhile(predicate) {
  var enumerator = this.getEnumerator();
  var i = 0; 
  
  return function() {    
    
    if (!enumerator.moveNext() || 
      !predicate || 
      !predicate(enumerator.current, i++))
      return false;
    
    this.current_ = enumerator.current;
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(takeWhile) }
});