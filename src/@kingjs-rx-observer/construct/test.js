var { assert,
  '@kingjs': {
    IObserver: { Subscribed, Next, Complete, Error },
    '-rx-observer': { construct }
  }
} = module[require('@kingjs-module/dependencies')]()

var observer = construct()
assert(observer)

var next = o => null
var complete = () => null
var error = e => null
var initialize = e => null

var observer = construct(next, complete, error, initialize)
assert.equal(observer[Next], next)
assert.equal(observer[Complete], complete)
assert.equal(observer[Error], error)
assert.equal(observer[Subscribed], initialize)