require('@kingjs/shim')
var assert = require('assert')
var timer = require('@kingjs/rx.timer')
var fail = require('@kingjs/rx.fail')
var Then = require('@kingjs/rx.then')
var ToPromise = require('@kingjs/rx.to-promise')
var Capture = require('..')

var E = 'E'

async function run() {

  var value = await timer()
    [Then](fail(E))
    [Capture](e => assert(e == E))
    [ToPromise]()

  assert(value === undefined)
}
run()