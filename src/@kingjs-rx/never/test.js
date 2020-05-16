var assert = require('assert')
var never = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')

var dispose = never()
  [Subscribe](assert, assert, assert)

setTimeout(() => {
  dispose()
}, 500)
