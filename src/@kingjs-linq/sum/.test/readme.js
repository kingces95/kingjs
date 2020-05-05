require('kingjs');
var Sum = require('..');
var assert = require('assert');

function readme() {
  var summation = [1, 2, 3][Sum]();
  assert(summation == 6);
}
readme();

function zero() {
  var summation = [][Sum]();
  assert(summation == 0);
}
zero();