var returnArg0 = require('..');
var assert = require('assert')

var helloWorld = 'Hello World!';
assert(helloWorld == returnArg0(helloWorld));