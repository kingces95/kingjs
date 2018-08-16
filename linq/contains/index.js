'use strict';

var defaultEqual = require('@kingjs/linq.default-equal');

function contains(value, equal) {
  var enumerator = this.getEnumerator();
  
  if (!equal)
    equal = defaultEqual;
  
  while (enumerator.moveNext()) {
    if (equal(value, enumerator.current))
      return true;
  }
  
  return false;
};

Object.defineProperties(module, {
  exports: { value: contains }
});