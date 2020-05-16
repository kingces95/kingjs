var assert = require('assert')
var { Subscribe } = require('@kingjs/rx.i-observable')
var of = require('@kingjs/rx.of')
var Select = require('..')
var Then = require('@kingjs/rx.then')
var never = require('@kingjs/rx.never')
var Async = require('@kingjs/rx.next-tick-scheduler')
var timer = require('@kingjs/rx.timer')

async function run() {
  var result = []
  await new Promise((resolve) => {
    of(0)
      [Select](o => o + 1)
      [Subscribe](
        o => result.push(o),
        resolve,
      )
  })

  assert.deepEqual(result, [1])
}
run()

async function runAsync() {
  var result
  await new Promise((resolve) => {
    var dispose = timer()
      [Then](of(0))
      [Then](never())
      [Select]( 
        async o => result = await Promise.resolve(o + 1), 
      Async)
      [Subscribe](
        o => { result = o dispose() resolve() },
      )
  })

  assert(result == 1)
}
//runAsync()