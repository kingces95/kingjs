require('kingjs');
var Count = require('..');
var assert = require('assert');

assert(3 == [1, 2, 3][Count]());

var isOdd = function(o) { return o % 2 == 1; }
assert(2 == [1, 2, 3][Count](isOdd));