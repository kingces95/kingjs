'use strict';

var defaultEqual = require('@kingjs/linq.default-equal');

function sequenceEqual(other, equals) {
      
  if (equals === undefined)
    equals = defaultEqual;
  
  var lhs = this.getEnumerator();  
  var rhs = other.getEnumerator();  
  
  while (lhs.moveNext()) {
    if (rhs.moveNext() == false)
      return false;
    
    var lhsValue = lhs.current;
    var rhsValue = rhs.current;
    
    if (!equals(lhsValue, rhsValue))
      return false;
  }
  
  return rhs.moveNext() == false;
};

Object.defineProperties(module, {
  exports: { value: sequenceEqual }
});