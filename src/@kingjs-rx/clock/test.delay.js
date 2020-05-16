var assert = require('assert')
var clock = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')
var delay = 50

async function run() {
  var start = Date.now()

  var end
  await new Promise(resolve => {
    var unsubscribe = new clock(() => delay)[Subscribe](
      o => { 
        end = o
        unsubscribe()
        resolve() 
      }
    )
  })

  assert(end - start >= delay)
}
run()
