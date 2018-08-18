'use strict';

var define = require('@kingjs/enumerable.define');

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
  exports: { value: define(select) }
});