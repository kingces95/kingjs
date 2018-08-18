var equal = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

assert(equal(0, 0) == true);
assert(equal(0, 1) == false);