var first = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');
var assertThrows = require('@kingjs/assert-throws');

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
