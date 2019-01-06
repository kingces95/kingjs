require('kingjs');

var assert = require('assert');

var Any = require('..');

var sequence = [0, 1, 2];

assert(sequence[Any](function(o) { return o == 2; }));
assert(!sequence[Any](function(o) { return o == 3; }));