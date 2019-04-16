var assert = require('assert');
var Remove = require('..');

var array = [1, 2, 3];
array[Remove](2);
assert.deepEqual(array, [1, 3]);