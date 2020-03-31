var assert = require('assert')
var exists = require('..')

async function test() {
  assert(await exists(__filename) === true)
  assert(await exists('no.such.file') === false)
} 

test()