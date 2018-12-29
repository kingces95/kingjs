var all = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var sequence = [0, 1, 2];

assert(sequence[all](function(o) { return o < 3; }));
assert(!sequence[all](function(o) { return o < 2; }));