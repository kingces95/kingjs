var assert = require('assert')
var AsyncMap = require('@kingjs-pojo/promises.map')
var Map = require('@kingjs-pojo/map')
var sleep = require('@kingjs-promise/sleep')

var runner = { alice: 100, bob: 200, charlie: 0 }
var output = [ 'third', 'second', 'first' ]

var result = runner
  [Map](async (ms) => {
    await sleep(ms)
    return output.pop()
  })
  [AsyncMap]((o, n) => `${n} finished ${o}`)
  .then(o => console.log(o))