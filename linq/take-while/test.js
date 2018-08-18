var takeWhile = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var toArray = testRequire('@kingjs/linq.to-array');

function readme() {
  function isNegative(x) { return x < 0; };

  var result = takeWhile.call(sequence(-2, -1, 0, -1, -2), isNegative);
  var array = toArray.call(result);

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();

function isFirstTwo(x, i) { return i < 2; };

var result = takeWhile.call(sequence(-2, -1, 0, -1, -2), isFirstTwo);
var array = toArray.call(result);

assert(array.length == 2);
assert(array[0] == -2);
assert(array[1] == -1);