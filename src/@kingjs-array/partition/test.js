var assert = require('assert')
var Partition = require('@kingjs-array/partition')

var result = [
  { i: 0, v: '0' }, 
  { i: 1, v: '1' }, 
  { i: 2, v: '2'} 
][Partition](
  o => o.i % 2 == 0 ? 'even' : 'odd', 
  o => o.v
)

assert(result.even)
assert(result.even.length == 2)
assert(result.even[0] == '0')
assert(result.even[1] == '2')
assert(result.odd)
assert(result.odd.length == 1)
assert(result.odd[0] == '1')