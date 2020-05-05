var assert = require('assert')
var GroupBy = require('@kingjs-array/group-by')

var result = [
  { i: 0, v: '0' }, 
  { i: 1, v: '1' }, 
  { i: 2, v: '2'} 
][GroupBy](
  o => o.i % 2 == 0 ? 'even' : 'odd', 
  o => o.v
)

assert(result[0])
assert(result[0].group.length == 2)
assert(result[0].key == 'even')
assert(result[0].group[0] == '0')
assert(result[0].group[1] == '2')
assert(result[1].group.length == 1)
assert(result[1].key == 'odd')
assert(result[1].group[0] == '1')