var { assert,
  '@kingjs': { 
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { Subject },
  },
} = module[require('@kingjs-module/dependencies')]()

var subject = new Subject()
subject[Complete]()

var result = false
subject[Subscribe](
  assert.fail,
  () => result = true,
  assert.fail
)
assert(result)

var E = 'E'
var subject = new Subject()
subject[Subscribe](
  assert.fail, 
  assert.fail, 
  e => assert.equal(e, E)
)
subject[Error](E)

var result = []
var subject = new Subject(null, 
  (self, next, disposed) => next(disposed ? 'ASYNC' : 'INIT')
)
subject[Subscribe](
  o => result.push(o),
  () => result.push('COMPLETE'),
  assert.fail,
)
subject[Complete]()
assert.deepEqual(result, [
  'INIT',
  'COMPLETE'
])

var result = []
var subject = new Subject(null, 
  (self, next, disposed) => next(disposed ? 'ASYNC' : 'INIT')
)
subject[Complete]()
subject[Subscribe](
  x => result.push(x),
  () => result.push('COMPLETE'),
  assert.fail,
)
assert.deepEqual(result, [
  'ASYNC',
  'COMPLETE'
])