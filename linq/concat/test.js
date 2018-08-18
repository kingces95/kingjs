var concat = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var sequenceEqual = testRequire('@kingjs/linq.sequence-equal');
var assert = testRequire('@kingjs/assert');

var result = concat.call(
  sequence(0, 1),
  sequence(1, 2)
);

assert(sequenceEqual.call(
  result,
  sequence(0, 1, 1, 2),
));