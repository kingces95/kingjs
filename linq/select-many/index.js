'use strict';

var defineGenerator = require('@kingjs/define-generator');

function defaultCollectionSelector(x, i) {
  return x;
}

function defaultResultSelector(x, y) {
  return y;
}

function selectMany(
  collectionSelector,
  resultSelector
) {
  var enumerator = this.getEnumerator();
  var current;
  var manyEnumerator;
  var i = 0;

  if (!collectionSelector)
    collectionSelector = defaultCollectionSelector;

  if (!resultSelector)
    resultSelector = defaultResultSelector;
  
  return function() {    
    while (true) {      
      if (manyEnumerator && manyEnumerator.moveNext())
        break;
      
      var manyEnumerable = null;
      if (!enumerator.moveNext()) 
        return false;

      current = enumerator.current;
      manyEnumerable = collectionSelector(current, i++);
      manyEnumerator = manyEnumerable.getEnumerator();
    }

    this.current_ = resultSelector(current, manyEnumerator.current);
    return true;
  };
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(selectMany) }
});