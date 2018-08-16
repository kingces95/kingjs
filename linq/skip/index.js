'use strict';

var defineGenerator = require('@kingjs/define-generator');

function skip(count) {
  var enumerator = this.getEnumerator();
  
  return function() {    
    
    do {      
      if (!enumerator.moveNext())
        return false;
    } while (count-- > 0);
    
    this.current_ = enumerator.current;
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(skip) }
});