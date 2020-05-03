var assert = require('assert')
var ResolveNpmScope = require('..')
var Path = require('@kingjs/path')

async function test() {
  var path = await Path.cwd()[ResolveNpmScope]()
  var npmScope = require(path.toString())
  assert(npmScope.name == 'kingjs')
}
test()