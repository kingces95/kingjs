'use strict';

var defineGenerator = require('@kingjs/define-generator');

function select(selector) {
  var enumerator = this.getEnumerator();
  var i = 0;
  
  return function() {    
    if (!enumerator.moveNext())
      return false;
    
    this.current_ = selector(enumerator.current, i++);
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(select) }
});