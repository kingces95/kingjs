'use strict';

var linq = require('@kingjs/linq.package');
var { getEnumerator } = linq.load('IEnumerable');
var { moveNext, current } = linq.load('IEnumerator');

function all(predicate) {    
  var enumerator = this[getEnumerator]();
  while (enumerator[moveNext]()) {
    if (predicate && !predicate(enumerator[current]))
      return false;
  }
  
  return true;
}

Object.defineProperties(module, {
  exports: { value: linq.extendEnumerable(all) }
});