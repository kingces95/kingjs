var assert = require('assert')
var Subject = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete, Error } = require('@kingjs/rx.i-observer')

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
subject[Subscribe](null, null, e => null)
subject[Error](E)

var result
subject[Subscribe](
  assert.fail,
  assert.fail,
  e => result = e,
)
assert(result == E)

var result = []
var subject = new Subject(null, 
  (next, disposed) => next(disposed ? 'ASYNC' : 'INIT')
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
  (next, disposed) => next(disposed ? 'ASYNC' : 'INIT')
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