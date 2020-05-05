var assert = require('assert');
var lessThan = require('..');

assert(lessThan('1.2.3', '2.0.0'));
assert(lessThan('1.2.3', '1.3.0'));
assert(lessThan('1.2.3', '1.2.4'));

assert(!lessThan('1.2.3', '1.2.3'));

var major = 1;
var minor = 2;
var patch = 3;
assert(!lessThan({ major, minor, patch }, '1.2.3'));