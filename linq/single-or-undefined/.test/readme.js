require('kingjs');
var singleOrUndefined = require('..');
var assert = require('assert');

assert(singleOrUndefined.call(sequence(0)) == 0);
assert(singleOrUndefined.call(sequence()) === undefined);
assert(singleOrUndefined.call(sequence(0, 1)) === undefined);

function isOdd(x) {
  return x % 2 == 1; 
}

assert(singleOrUndefined.call([1, 2, 3], isOdd) == 1);
assert(singleOrUndefined.call(sequence(), isOdd) === undefined);
assert(singleOrUndefined.call(sequence(0), isOdd) === undefined);
assert(singleOrUndefined.call(sequence(0, 1, 3), isOdd) === undefined);

