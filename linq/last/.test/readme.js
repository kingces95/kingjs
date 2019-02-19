require('kingjs');
var Last = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function readme() {
  assert([1, 2, 3][Last]() == 3);
  assertThrows(function() {
    last.call(sequence())
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert([0, 1, 2, 3, 4][Last](isOdd) == 3);
  assertThrows(function() {
    [0, 2][Last](isOdd)
  });
}
readmePredicate();
