var equal = require('..');
var assert = require('assert');

assert(equal(0, 0) == true);
assert(equal(0, 1) == false);