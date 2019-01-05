var assert = require('assert');
var { } = require('@kingjs/require-packages').call(module);

var All = require('..');

var sequence = [0, 1, 2];

assert(sequence[All](function(o) { return o < 3; }));
assert(!sequence[All](function(o) { return o < 2; }));