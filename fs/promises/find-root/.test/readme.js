var assert = require('assert')
var findRoot = require('..')
var Path = require('path')

async function test() {
  var cwd = process.cwd()
  var { base } = Path.parse(__filename)
  var nestedPath = Path.join(Path.dirname(__filename), 'foo', base)
  var rootPath = await findRoot(nestedPath, __filename)
  assert(rootPath == __filename)

  var cwd = process.cwd()
  assert(await findRoot(cwd, 'no.such.file') === undefined)
} 

test()