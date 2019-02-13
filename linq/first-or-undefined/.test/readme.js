require('kingjs');
var firstOrUndefined = require('..');
var assert = require('assert');

function readme() {
  assert(firstOrUndefined.call([1, 2, 3]) == 0);
  assert(firstOrUndefined.call(sequence()) == undefined);
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(firstOrUndefined.call([1, 2, 3], isOdd) == 1);
  assert(firstOrUndefined.call(sequence(0, 2), isOdd) == undefined);
}
readmePredicate();
