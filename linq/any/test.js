var any = require('./index');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/sequence');

var enumerable = sequence(0, 1, 2);

assert(any.call(enumerable, function(o) { return o == 2; }));
assert(!any.call(enumerable, function(o) { return o == 3; }));

