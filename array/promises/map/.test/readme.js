var assert = require('assert')
var AsyncMap = require('..')
var sleep = require('@kingjs/promise.sleep')

var runner = [100, 200, 0]
var output = ['third', 'second', 'first']

var result = runner
  .map(async (ms) => {
    await sleep(ms)
    return output.pop()
  })
  [AsyncMap](o => `Finished ${o}`)
  .then(console.log)