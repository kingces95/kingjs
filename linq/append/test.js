var append = require('./index');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');
var sequenceEqual = require('@kingjs/linq.sequence-equal');

function readme() {
  var enumerable = sequence(0, 1, 2);

  var result = append.call(enumerable, 3);

  var array = toArray.call(result);

  assert(
    sequenceEqual.call(
      sequence(0, 1, 2, 3),
      sequence.apply(this, array)
    )
  );
}
readme();