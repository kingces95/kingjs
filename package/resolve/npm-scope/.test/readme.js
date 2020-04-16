var assert = require('assert')
var ResolveNpmScope = require('..')
var Path = require('@kingjs/path.builder')

async function test() {
  var path = await Path.Cwd[ResolveNpmScope]()
  var npmScope = require(path.toString())
  assert(npmScope.name == 'kingjs')
}
test()