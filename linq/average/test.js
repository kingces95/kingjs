var sequence = require('@kingjs/sequence');
var average = require('./index');
var assert = require('@kingjs/assert');

function test(array, result) {
  assert(average.call(sequence.apply(this, array)) == result);
}

test([2], 2);
test([1, 2, 3], 2);
test([-2, 0, 2], 0);

var empty = sequence();
assert(Number.isNaN(average.call(empty)));

assert(
  average.call(
    sequence({ value: -1 }, { value: 1 }),
    function (x) { return x.value; }
  ) == 0
)