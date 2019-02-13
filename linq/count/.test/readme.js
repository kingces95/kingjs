var count = require('..');
var assert = require('assert');

assert(3 == count.call([1, 2, 3]));

var isOdd = function(o) { return o % 2 == 1; }
assert(2 == count.call([1, 2, 3], isOdd));