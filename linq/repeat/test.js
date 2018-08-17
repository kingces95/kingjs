var repeat = require('.');
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

test(repeat(0, 0), []);
test(repeat(0, 3), [0, 0, 0]);