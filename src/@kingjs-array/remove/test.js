var assert = require('assert')
var Remove = require('@kingjs-array/remove')

var array = [1, 2, 3]
array = array[Remove](2)
assert.deepEqual(array, [1, 3])