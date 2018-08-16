'use strict';

var defineGenerator = require('@kingjs/define-generator');
var Dictionary = require('@kingjs/dictionary');

function defaultSelector(x) {
  return x;
}

function intersect(
  second,
  idSelector) {

  if (!idSelector)
    idSelector = defaultSelector;

  var firstEnumerator = this.getEnumerator();
  var secondEnumerator = second.getEnumerator();
  
  var set;
  
  return function() {

    if (!set)
      set = new Dictionary();
    
    if (secondEnumerator) {
      while (secondEnumerator.moveNext())
        set[idSelector(secondEnumerator.current)] = undefined;
        secondEnumerator = null;
    }
    
    while (firstEnumerator.moveNext()) {
      var current = firstEnumerator.current;
      var id = idSelector(current);
      if (!(id in set))
        continue;
      
      // skip future duplicates
      delete set[id];

      this.current_ = current;
      return true;
    }

    return false;
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(intersect) }
});