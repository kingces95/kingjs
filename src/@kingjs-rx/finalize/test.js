require('@kingjs/shim')
var assert = require('assert')
var { Subscribe } = require('@kingjs/rx.i-observable')
var of = require('@kingjs/rx.of')
var fail = require('@kingjs/rx.fail')
var Finalize = require('..')

var f = 'f'

var N = 'N'
var C = 'C'
var E = 'E'

var result = []
of(0, 1)
  [Finalize](
    () => result.push(f),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(o),
  )

assert.deepEqual(result, [
  N, 0, 
  N, 1, 
  f, C
])

var result = []
fail(E)
  [Finalize](
    () => result.push(f)
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(o),
  )
  assert.deepEqual(result, [
    f, E
  ])