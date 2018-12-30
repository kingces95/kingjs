var average = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function test(array, result) {
  assert(array[average]() == result);
}

test([2], 2);
test([1, 2, 3], 2);
test([-2, 0, 2], 0);

var empty = [];
assert(Number.isNaN(empty[average]()));

assert(
  [{ value: -1 }, { value: 1 }][average](
    function (x) { return x.value; }
  ) == 0
)