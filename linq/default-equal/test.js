var equal = require('./index');
var assert = require('@kingjs/assert');

assert(equal(0, 0) == true);
assert(equal(0, 1) == false);