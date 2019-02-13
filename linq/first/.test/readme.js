require('kingjs');
var first = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function readme() {
  assert(first.call([1, 2, 3]) == 0);
  assertThrows(function() {
    first.call(sequence())
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(first.call([1, 2, 3], isOdd) == 1);
  assertThrows(function() {
    first.call(sequence(0, 2), isOdd)
  });
}
readmePredicate();
