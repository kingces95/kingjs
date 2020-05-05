var returnThis = require('..');
var assert = require('assert')

var helloWorld = 'Hello World!';
assert(helloWorld == returnThis.call(helloWorld));
