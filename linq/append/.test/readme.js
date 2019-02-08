var append = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');
var toArray = testRequire('@kingjs/linq.to-array');
var sequenceEqual = testRequire('@kingjs/linq.sequence-equal');

var enumerable = [ 0, 1, 2 ];
var result = append.call(enumerable, 3);
var array = toArray.call(result);

assert(
  sequenceEqual.call(
    sequence(0, 1, 2, 3),
    sequence.apply(this, array)
  )
);