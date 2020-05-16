require('@kingjs/shim')
var assert = require('assert')
var { Subscribe } = require('@kingjs/rx.i-observable')
var Distinct = require('..')
var of = require('@kingjs/rx.of')

var expected = [0, 1, 2]

of(0, 1, 2, 0, 1, 2)
  [Distinct]()
  [Subscribe](o => 
    assert.equal(o, expected.pop())
  )