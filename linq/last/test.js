var last = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function readme() {
  assert(last.call(sequence(0, 1, 2)) == 2);
  assertThrows(function() {
    last.call(sequence())
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(last.call(sequence(0, 1, 2, 3, 4), isOdd) == 3);
  assertThrows(function() {
    last.call(sequence(0, 2), isOdd)
  });
}
readmePredicate();
