var linq = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

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

var all = linq.extendEnumerable(all);

var sequence = [0, 1, 2];
assert(sequence[all](function(o) { return o < 3; }));
assert(!sequence[all](function(o) { return o < 2; }));