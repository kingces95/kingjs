var assert = require('assert')
var clock = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')

async function run() {
  var count = 3
  var result = []

  var i = 0
  await new Promise(resolve => {
    var unsubscribe = clock()[Subscribe](() => {

      // prove values are returned in different clock ticks
      process.nextTick(() => result.push(null))

      result.push(i++)

      if (i == count) {
        resolve()
        unsubscribe()
      }
    }, resolve)
  })

  assert.deepEqual(result, [0, null, 1, null, 2])
}
run()