var concat = require('./index');
var sequence = require('@kingjs/sequence');
var sequenceEqual = require('@kingjs/linq.sequence-equal');
var assert = require('@kingjs/assert');

var result = concat.call(
  sequence(0, 1),
  sequence(1, 2)
);

assert(sequenceEqual.call(
  result,
  sequence(0, 1, 1, 2),
));