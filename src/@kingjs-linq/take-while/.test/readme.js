require('kingjs');
var TakeWhile = require('..');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  function isNegative(x) { return x < 0; };

  var result = [-2, -1, 0, -1, -2][TakeWhile](isNegative);
  var array = result[ToArray]();

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();

function isFirstTwo(x, i) { return i < 2; };

var result = [-2, -1, 0, -1, -2][TakeWhile](isFirstTwo);
var array = result[ToArray]();

assert(array.length == 2);
assert(array[0] == -2);
assert(array[1] == -1);