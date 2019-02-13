var lessThan = require('..');
var assert = require('assert');

assert(lessThan(0, 0) == false);
assert(lessThan(0, 1) == true);