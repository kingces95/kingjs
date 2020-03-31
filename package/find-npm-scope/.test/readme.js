var assert = require('assert')
var findNpmScope = require('..')

async function test() {
  var npmScope = require(await findNpmScope())
  assert(npmScope.name == 'kingjs')
}

test()