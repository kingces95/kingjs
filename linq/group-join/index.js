'use strict';

var defineGenerator = require('@kingjs/define-generator');
var toLookup = require('@kingjs/linq.to-lookup');
var empty = require('@kingjs/linq.empty');

function groupJoin(
  innerEnumerable, 
  outerKeySelector, 
  innerKeySelector, 
  resultSelector) {
  
  var outerEnumerable = this;
  
  var innerLookup = undefined;
  var outerEnumerator = undefined;
  
  return function() { 
    
    if (!innerLookup) 
      innerLookup = toLookup.call(innerEnumerable, innerKeySelector);
    
    if (!outerEnumerator)
    outerEnumerator = outerEnumerable.getEnumerator();
    
    if (!outerEnumerator.moveNext()) {
      innerLookup = undefined;
      outerEnumerator = undefined;
      return false;
    }

    var outerElement = outerEnumerator.current;
    var key = outerKeySelector(outerElement);
    var innerSequence = innerLookup[key] || empty();
    this.current_ = resultSelector(outerElement, innerSequence);
    return true;
  }
}

Object.defineProperties(module, {
  exports: { value: defineGenerator(groupJoin) }
});