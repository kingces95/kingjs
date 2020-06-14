var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Subscribed, Next, Complete, Error },
    '-rx-observer': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

var observer = create()
assert.ok(observer instanceof IObserver)

var next = o => null
var complete = () => null
var error = e => null
var initialize = e => null

var observer = create(next, complete, error, initialize)
assert.equal(observer[Next], next)
assert.equal(observer[Complete], complete)
assert.equal(observer[Error], error)
assert.equal(observer[Subscribed], initialize)

var initialize = e => null

var expected = { 
  [Subscribed]: initialize, 
  [Next]: next, 
  [Complete]: complete, 
  [Error]: error 
}
var actual = create(expected)
assert.equal(expected, actual)