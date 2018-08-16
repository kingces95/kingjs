var lessThan = require('./index');
var assert = require('@kingjs/assert');

assert(lessThan(0, 0) == false);
assert(lessThan(0, 1) == true);