require('kingjs');
var range = require('..');
var assert = require('assert');
var SequenceEqual = require('@kingjs/linq.sequence-equal');

function test(enumerable, array) {
  assert(enumerable[SequenceEqual](array));
}

test(range(0, 0), []);
test(range(0, 3), [0, 1, 2]);
test(range(-2, 2), [-2, -1]);