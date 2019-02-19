'use strict';

var defaultLessThan = require('@kingjs/linq.default-less-than');

/**
 * @description Returns the minimum value in a sequence of values 
 * projected from elements of a sequence.
 * 
 * @param {*} lessThan 
 */
function min(lessThan) {
  if (!lessThan)
    lessThan = defaultLessThan;
  
  var result = undefined
  var enumerator = this.getEnumerator();
  if (enumerator.moveNext()) {
    result = enumerator.current;
    
    while (enumerator.moveNext()) {
      if (lessThan(enumerator.current, result) == true)
        result = enumerator.current;
    }
  }

  return result;
};

Object.defineProperties(module, {
  exports: { value: min }
});