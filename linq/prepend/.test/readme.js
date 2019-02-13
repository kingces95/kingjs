require('kingjs');
var prepend = require('..');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');
var sequenceEqual = require('@kingjs/linq.sequence-equal');

function readme() {
  var numbers = [1, 2, 3];

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