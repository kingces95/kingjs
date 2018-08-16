var firstOrUndefined = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');

function readme() {
  assert(firstOrUndefined.call(sequence(0, 1, 2)) == 0);
  assert(firstOrUndefined.call(sequence()) == undefined);
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(firstOrUndefined.call(sequence(0, 1, 2), isOdd) == 1);
  assert(firstOrUndefined.call(sequence(0, 2), isOdd) == undefined);
}
readmePredicate();
