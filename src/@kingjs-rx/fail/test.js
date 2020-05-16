require('@kingjs/shim')
var assert = require('assert')
var from = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')

function example(value) {
  var next
  var complete
  
  new from(value)[Subscribe](
    o => next = o, 
    () => complete = true
  )
  
  assert(next == 1)
  assert(complete)
}
example([1])
example(function *() { yield 1 })
