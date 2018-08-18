var lessThan = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

assert(lessThan(0, 0) == false);
assert(lessThan(0, 1) == true);