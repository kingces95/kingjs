var sum = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');

function readme() {
  var summation = sum.call(sequence(1, 2, 3));
  assert(summation == 6);
}
readme();

function zero() {
  var summation = sum.call(sequence());
  assert(summation == 0);
}
zero();