require('@kingjs/shim')
var assert = require('assert')
var of = require('@kingjs/rx.of')
var timer = require('@kingjs/rx.timer')
var Then = require('@kingjs/rx.then')
var Count = require('..')

async function run() {
  var result = await timer()
    [Then](of(0, 1, 2))
    [Count]()

  assert(result == 3)
}
run()