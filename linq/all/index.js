'use strict';

var { define, getEnumerator, moveNext, current } = require('@kingjs/linq.define');

define(module, 'exports', function all(predicate) {    
  var enumerator = this[getEnumerator]();
  while (enumerator[moveNext]()) {
    if (predicate && !predicate(enumerator[current]))
      return false;
  }
  
  return true;
});