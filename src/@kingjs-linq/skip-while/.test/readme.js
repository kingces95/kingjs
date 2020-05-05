require('kingjs');
var SkipWhile = require('..');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  function isNegative(x) { return x < 0; };

  var result = [-2, -1, 0, -1, -2][SkipWhile](isNegative);
  var array = result[ToArray]();

  assert(array.length == 3);
  assert(array[0] == 0);
  assert(array[1] == -1);
  assert(array[2] == -2);
}
readme();

function isFirstTwo(x, i) { return i < 2; };

var result = [-2, -1, 0, -1, -2][SkipWhile](isFirstTwo);
var array = result[ToArray]();

assert(array.length == 3);
assert(array[0] == 0);
assert(array[1] == -1);
assert(array[2] == -2);