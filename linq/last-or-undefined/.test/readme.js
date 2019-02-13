require('kingjs');
var lastOrUndefined = require('..');
var assert = require('assert');

function readme() {
  assert(lastOrUndefined.call([1, 2, 3]) == 2);
  assert(lastOrUndefined.call(sequence()) == undefined);
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(lastOrUndefined.call(sequence(0, 1, 2, 3, 4), isOdd) == 3);
  assert(lastOrUndefined.call(sequence(0, 2), isOdd) == undefined);
}
readmePredicate();
