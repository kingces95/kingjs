var all = require('./index');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/sequence');

var enumerable = sequence(0, 1, 2);

assert(all.call(enumerable, function(o) { return o < 3; }));
assert(!all.call(enumerable, function(o) { return o < 2; }));