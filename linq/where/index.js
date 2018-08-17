'use strict';

var define = require('@kingjs/enumerable.define');

function where(predicate) {
  var enumerator = this.getEnumerator();
  var i = 0;
  
  return function() {    
    while (true) {
      if (!enumerator.moveNext())
        return false;
      
      var current = enumerator.current;
      if (!predicate(current, i++))
        continue;
      
      this.current_ = current;
      return true;
    }
  };
};

Object.defineProperties(module, {
  exports: { value: define(where) }
});