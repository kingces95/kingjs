'use strict';

var defaultLessThan = require('@kingjs/linq.default-less-than');

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