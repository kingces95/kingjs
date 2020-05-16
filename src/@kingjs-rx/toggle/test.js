require('@kingjs/shim')
var assert = require('assert')
var Toggle = require('..')
var timer = require('@kingjs/rx.timer')
var Subject = require('@kingjs/rx.subject')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next } = require('@kingjs/rx.i-observer')
var { Key } = require('@kingjs/rx.i-grouped-observable')

result = []

var source = new Subject()

var promise = new Promise(resolve => {
  source
    [Toggle](
      () => timer()
    )
    [Subscribe](
      o => o[Subscribe](() => {
        result.push(o[Key])
        resolve()
      })
    )
})

source[Next](0)
source[Next](0)
source[Next](1)

promise.then(() => {
  assert.deepEqual(result, [1])  
})
