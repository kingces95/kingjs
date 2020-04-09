var assert = require('assert')
var resolveNpmScope = require('..')

async function test() {
  var npmScope = require(await resolveNpmScope())
  assert(npmScope.name == 'kingjs')
}

test()