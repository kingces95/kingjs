require('kingjs');
var range = require('..');
var assert = require('assert');
var sequenceEqual = require('@kingjs/linq.sequence-equal');

function test(enumerable, array) {
  assert(
    sequenceEqual.call(
      enumerable, 
      sequence.apply(this, array)
    )
  );
}

test(range(0, 0), []);
test(range(0, 3), [0, 1, 2]);
test(range(-2, 2), [-2, -1]);