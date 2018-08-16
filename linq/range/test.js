var range = require('./index');
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

test(range(0, 0), []);
test(range(0, 3), [0, 1, 2]);
test(range(-2, 2), [-2, -1]);