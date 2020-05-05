var assert = require('assert')
var AsyncMap = require('@kingjs-array/promises-map')
var sleep = require('@kingjs-promise/sleep')

async function test() {
  var runner = [100, 200, 0]
  var output = ['third', 'second', 'first']

  var result = await runner
    [AsyncMap](async (ms) => {
      await sleep(ms)
      return `finished ${output.pop()}`
    })

  assert.deepEqual(result, [
    'finished second',
    'finished third',
    'finished first'
  ])
}
test()
