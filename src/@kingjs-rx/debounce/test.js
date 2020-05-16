require('@kingjs/shim')
var assert = require('assert')
var DebounceTime = require('..')
var clock = require('@kingjs/rx.clock')
var Zip = require('@kingjs/rx.zip')
var { Subscribe } = require('@kingjs/rx.i-observable')

var duration = 50

async function run() {
  var result = []

  await new Promise((resolve) => {
    clock(() => duration * 2)
      [Zip]([0, 1], (l, r) => r)
      [DebounceTime](duration)
      [Subscribe](
        o => result.push(o),
        resolve,
      )
  })

  assert.deepEqual(result, [0, 1])
}
run()

async function bounce() {
  var result = []

  await new Promise((resolve) => {
    clock(() => duration / 2)
      [Zip]([0, 1], (l, r) => r)
      [DebounceTime](duration)
      [Subscribe](
        o => result.push(o),
        resolve,
      )
  })

  assert.deepEqual(result, [1])
}
bounce()