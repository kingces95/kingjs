'use strict';

var defineGenerator = require('@kingjs/define-generator');
var toLookup = require('@kingjs/linq.to-lookup');

function join(
  innerEnumerable, 
  outerKeySelector, 
  innerKeySelector, 
  resultSelector) {

  var outerEnumerable = this;
  
  var outerEnumerator = undefined;
  var innerLookup = undefined;

  var innerEnumerator = undefined;
  var outerCurrent = undefined;
  
  return function() { 
    
    if (!outerEnumerator)
      outerEnumerator = outerEnumerable.getEnumerator();
    
    if (!innerLookup) 
      innerLookup = toLookup.call(innerEnumerable, innerKeySelector);
    
    while (true) {
      
      // find outer element with matching inner enumerable
      while (!innerEnumerator) {

        if (!outerEnumerator.moveNext())
          return false;
        
        outerCurrent = outerEnumerator.current;
        
        var key = outerKeySelector(outerCurrent);
        innerEnumerable = innerLookup[key];  
        if (!innerEnumerable)
          continue;

        innerEnumerator = innerEnumerable.getEnumerator();
      }
      
      // test if matches exhausted
      if (!innerEnumerator.moveNext()) {
        innerEnumerator = undefined;
        continue;
      }
      
      // yield match
      this.current_ = resultSelector(outerCurrent, innerEnumerator.current);
      return true;
    }
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(join) }
});