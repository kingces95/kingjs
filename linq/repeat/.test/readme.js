require('kingjs');
var repeat = require('..');
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

test(repeat(0, 0), []);
test(repeat(0, 3), [0, 0, 0]);