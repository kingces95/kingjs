var first = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function readme() {
  assert(first.call(sequence(0, 1, 2)) == 0);
  assertThrows(function() {
    first.call(sequence())
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(first.call(sequence(0, 1, 2), isOdd) == 1);
  assertThrows(function() {
    first.call(sequence(0, 2), isOdd)
  });
}
readmePredicate();
