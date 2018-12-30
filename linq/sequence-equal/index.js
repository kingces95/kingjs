'use strict';

var { define, getEnumerator, moveNext, current } = require('@kingjs/linq.define');
var defaultEqual = require('@kingjs/linq.default-equal');

define(module, 'exports', function sequenceEqual(other, equals) {
  if (equals === undefined)
    equals = defaultEqual;
  
  var lhs = this[getEnumerator]();  
  var rhs = other[getEnumerator]();  
  
  while (lhs[moveNext]()) {
    if (rhs[moveNext]() == false)
      return false;
    
    var lhsValue = lhs[current];
    var rhsValue = rhs[current];
    
    if (!equals(lhsValue, rhsValue))
      return false;
  }
  
  return rhs[moveNext]() == false;
})