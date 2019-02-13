require('kingjs');
var skipWhile = require('..');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  function isNegative(x) { return x < 0; };

  var result = skipWhile.call(sequence(-2, -1, 0, -1, -2), isNegative);
  var array = toArray.call(result);

  assert(array.length == 3);
  assert(array[0] == 0);
  assert(array[1] == -1);
  assert(array[2] == -2);
}
readme();

function isFirstTwo(x, i) { return i < 2; };

var result = skipWhile.call(sequence(-2, -1, 0, -1, -2), isFirstTwo);
var array = toArray.call(result);

assert(array.length == 3);
assert(array[0] == 0);
assert(array[1] == -1);
assert(array[2] == -2);