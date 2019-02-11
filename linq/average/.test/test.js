require('kingjs')
var assert = require('assert');
var Average = require('..');

function test(array, result) {
  assert(array[Average]() == result);
}

test([2], 2);
test([1, 2, 3], 2);
test([-2, 0, 2], 0);

var empty = [];
assert(Number.isNaN(empty[Average]()));

assert(
  [{ value: -1 }, { value: 1 }][Average](
    function (x) { return x.value; }
  ) == 0
)