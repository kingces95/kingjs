var repeat = require('./index');
var assert = require('@kingjs/assert');
var sequenceEqual = require('@kingjs/linq.sequence-equal');
var sequence = require('@kingjs/sequence');

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