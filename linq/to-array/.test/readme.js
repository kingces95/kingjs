require('kingjs');
var assert = require('assert');
var ToArray = require('..');

var array = '123'[ToArray]();

assert(array.length = 3);
assert(array[0] === '1');
assert(array[1] === '2');
assert(array[2] === '3');