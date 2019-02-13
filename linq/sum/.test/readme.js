require('kingjs');
var sum = require('..');
var assert = require('assert');

function readme() {
  var summation = sum.call([1, 2, 3]);
  assert(summation == 6);
}
readme();

function zero() {
  var summation = sum.call(sequence());
  assert(summation == 0);
}
zero();