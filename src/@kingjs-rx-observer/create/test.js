var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-rx-observer': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

var observer = create()
assert.ok(observer[Next])
assert.ok(observer[Complete])
assert.ok(observer[Error])

var next = o => null
var complete = () => null
var error = e => null

var observer = create(next, complete, error)
assert.equal(observer[Next], next)
assert.equal(observer[Complete], complete)
assert.equal(observer[Error], error)

var expected = { [Next]: next, [Complete]: complete, [Error]: error}
var actual = create(expected)
assert.equal(expected, actual)