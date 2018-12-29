var any = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var sequence = [0, 1, 2];

assert(sequence[any](function(o) { return o == 2; }));
assert(!sequence[any](function(o) { return o == 3; }));