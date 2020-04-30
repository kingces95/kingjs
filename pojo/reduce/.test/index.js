var assert = require('assert')
var Reduce = require('..')

var pojo = {
  foo: 0,
  bar: 0,
}

var result = { }
pojo[Reduce](
  function reducer(accumulator, name, value, o) {
    assert.equal(accumulator, result)
    assert.equal(o, pojo)
    accumulator[name] = value
  }, result
)
assert.deepEqual(result, pojo)

var result = pojo[Reduce](
  function reducer(accumulator, name, value, o) {
    accumulator[name] = value
    return accumulator
  }
)
assert.deepEqual(result, pojo)