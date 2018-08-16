var count = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');

assert(3 == count.call(sequence(1, 2, 3)));

var isOdd = function(o) { return o % 2 == 1; }
assert(2 == count.call(sequence(1, 2, 3), isOdd));