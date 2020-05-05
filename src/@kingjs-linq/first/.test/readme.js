require('kingjs');
var First = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function readme() {
  assert([0, 1, 2][First]() == 0);
  assertThrows(function() {
    [][First]()
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert([1, 2, 3][First](isOdd) == 1);
  assertThrows(function() {
    [0, 2][First](isOdd)
  });
}
readmePredicate();
