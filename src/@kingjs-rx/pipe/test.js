var assert = require('assert')
var { Subscribe } = require('@kingjs/rx.i-observable')
var of = require('@kingjs/rx.of')
var Select = require('..')

async function run() {
  var result = []

  await new Promise((resolve) => {
    of(0, 1, 2)[Select](o => o + 1)[Subscribe](
      o => result.push(o),
      resolve,
    )
  })

  assert.deepEqual(result, [1, 2, 3])
}
run()