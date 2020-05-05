var assert = require('assert')
var ToArray = require('@kingjs-pojo/to-array')

var list = {
  value: 0,
  next: {
    value: 1,
    next: {
      value: 2
    }
  }
}

var actual = list[ToArray](o => o.next, o => o.value)
assert.deepEqual(actual, [ 0, 1, 2 ])

var actual = list[ToArray](o => o.next)
actual = actual.map(o => o.value)
assert.deepEqual(actual, [ 0, 1, 2 ])