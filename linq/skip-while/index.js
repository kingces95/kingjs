'use strict';

var defineGenerator = require('@kingjs/define-generator');

function skipWhile(predicate) {
  var enumerator = this.getEnumerator();
  var i = 0;
  
  return function() {    
    
    do {      
      if (!enumerator.moveNext())
        return false;
    } while (predicate && predicate(enumerator.current, i++));
    
    predicate = undefined;
    
    this.current_ = enumerator.current;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(skipWhile) }
});