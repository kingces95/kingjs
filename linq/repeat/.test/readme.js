require('kingjs');
var repeat = require('..');
var assert = require('assert');
var SequenceEqual = require('@kingjs/linq.sequence-equal');

function test(enumerable, array) {
  assert(enumerable[SequenceEqual](array));
}

test(repeat(0, 0), []);
test(repeat(0, 3), [0, 0, 0]);