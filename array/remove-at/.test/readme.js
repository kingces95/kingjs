var assert = require('assert');
var RemoveAt = require('..');

var array = [1, 2, 3];
array[RemoveAt](1);
assert.deepEqual(array, [1, 3]);