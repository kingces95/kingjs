var assert = require('assert')
var ToPairs = require('..')

var pojo = {
  foo: 0,
  bar: 1
}

var actual = pojo[ToPairs]()

assert.deepEqual(actual, [
  { key: 'foo', value: 0 },
  { key: 'bar', value: 1 },
])