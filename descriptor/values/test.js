var range = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequenceEqual = testRequire('@kingjs/linq.sequence-equal');
var sequence = testRequire('@kingjs/enumerable.create');

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