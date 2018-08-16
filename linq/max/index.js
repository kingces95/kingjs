'use strict';

var defaultLessThan = require('@kingjs/linq.default-less-than');

function max(lessThan) {
  if (!lessThan)
    lessThan = defaultLessThan;
  
  var result = undefined
  var enumerator = this.getEnumerator();
  if (enumerator.moveNext()) {
    result = enumerator.current;
    
    while (enumerator.moveNext()) {
      if (lessThan(result, enumerator.current) == true)
        result = enumerator.current;
    }
  }

  return result;
};

Object.defineProperties(module, {
  exports: { value: max }
});