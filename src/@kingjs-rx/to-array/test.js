require('@kingjs/shim')
var assert = require('assert')
var from = require('@kingjs/rx.from')
var timer = require('@kingjs/rx.timer')
var Then = require('@kingjs/rx.then')
var ToArray = require('..')

var value = [0, 1, 2]

async function run() {
  var promise = await timer()
    [Then](from(value))
    [ToArray]()

  assert.deepEqual(value, await promise)
}
run()