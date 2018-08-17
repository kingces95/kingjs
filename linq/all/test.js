var all = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');

var enumerable = sequence(0, 1, 2);

assert(all.call(enumerable, function(o) { return o < 3; }));
assert(!all.call(enumerable, function(o) { return o < 2; }));