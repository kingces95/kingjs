var any = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');

var enumerable = sequence(0, 1, 2);

assert(any.call(enumerable, function(o) { return o == 2; }));
assert(!any.call(enumerable, function(o) { return o == 3; }));

