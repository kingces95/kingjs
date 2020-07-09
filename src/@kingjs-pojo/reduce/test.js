var assert = require('assert')
var Reduce = require('@kingjs-pojo/reduce')

var pojo = {
  foo: 0,
  bar: 1,
}

var result = { }
pojo[Reduce](
  function reducer(accumulator, name, value, o) {
    assert.equal(accumulator, result)
    assert.equal(o, pojo)
    accumulator[name] = value
  }, { initialValue: result }
)
assert.deepEqual(result, pojo)

var result = pojo[Reduce](
  function reducer(accumulator, name, value, o) {
    accumulator[name] = value
    return accumulator
  }
)
assert.deepEqual(result, pojo)

class FooBar {
  static get foo() { return 0 }
}
FooBar.bar = 1

FooBar[Reduce](
  function reducer(accumulator, name, value) {
    accumulator[name] = value
  }, { nonEnumerable: true }
)
assert.deepEqual(result, pojo)

var result = FooBar[Reduce](
  function reducer(accumulator, name, value) {
    accumulator[name] = value
  }, { nonEnumerable: true, enumerable: false }
)
assert.deepEqual(result, { foo: 0 })