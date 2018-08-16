var prepend = require('./index');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');
var sequenceEqual = require('@kingjs/linq.sequence-equal');

function readme() {
  var numbers = sequence(1, 2, 3);

  var result = prepend.call(numbers, 0);

  var array = toArray.call(result);

  assert(
    sequenceEqual.call(
      sequence(0, 1, 2, 3),
      sequence.apply(this, array)
    )
  );
}
readme();