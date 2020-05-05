var assert = require('assert')
var RemoveAt = require('@kingjs-array/remove-at')

var array = [1, 2, 3]
assert(2 == array[RemoveAt](1))
assert.deepEqual(array, [1, 3])