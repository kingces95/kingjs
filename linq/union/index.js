'use strict';

var define = require('@kingjs/enumerable.define');
var Dictionary = require('@kingjs/dictionary');

function defaultSelector(x) {
  return x;
}

/**
 * @description Generates the set union of two sequences.
 * 
 * @param {*} second 
 * @param {*} idSelector 
 */
function union(
  second, 
  idSelector) {

  if (!idSelector)
    idSelector = defaultSelector;

  var firstEnumerator = this.getEnumerator();
  var secondEnumerator = second.getEnumerator();
  
  var set = new Dictionary();
  
  return function() { 
    
    while (firstEnumerator && firstEnumerator.moveNext()) {
      var current = firstEnumerator.current;

      var id = idSelector(current);
      if (id in set)
        continue;
      set[id] = undefined;

      this.current_ = current;
      return true;
    }
    firstEnumerator = null;
    
    while (secondEnumerator && secondEnumerator.moveNext()) {   
      var current = secondEnumerator.current;

      var id = idSelector(current);
      if (id in set)
        continue;
      set[id] = undefined;

      this.current_ = current;
      return true;
    }
    secondEnumerator = null;
    
    return false;
  };
};

Object.defineProperties(module, {
  exports: { value: define(union) }
});