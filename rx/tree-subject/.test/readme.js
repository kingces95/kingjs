var assert = require('assert')
var TreeSubject = require('..')
var of = require('@kingjs/rx.of')
var IObservable = require('@kingjs/rx.i-observable')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete, Error } = require('@kingjs/rx.i-observer')
var { Value } = require('@kingjs/rx.i-published-observable')

var isNode = o => o instanceof TreeSubject
var selectMany = o => o[Value]
var prune = (o, callback) => {
  if (o instanceof IObservable)
    o[Subscribe](null, callback, callback)
}

var a = new TreeSubject()
var e = new TreeSubject()
var b = new TreeSubject(
  o => {
    o[Next](0)
    o[Next](a)
    o[Next](3)
    o[Next](e) 
  }, 
  isNode, selectMany, prune
)

a[Next](1)
a[Next](2)

e[Next](4)

var result = []
b[Subscribe](
  o => result.push(o)
)
assert.deepEqual(result, [0, 1, 2, 3, 4])

a[Complete]()
var result = []
b[Subscribe](
  o => result.push(o)
)
assert.deepEqual(result, [0, 3, 4])

e[Subscribe](null, null, e => null)
e[Error]()
var result = []
b[Subscribe](
  o => result.push(o)
)
assert.deepEqual(result, [0, 3])
