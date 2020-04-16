var assert = require('assert')
var Path = require('@kingjs/path.builder')
var FindRoot = require('..')

async function test() {
  var thisFile = Path.create(__filename)
  var thisDir = thisFile.dir
  var targetFileName = thisFile.name
  var nestedPath = thisDir.to('foo').to('bar')
  var rootPath = await nestedPath[FindRoot](targetFileName)
  assert(rootPath.equals(thisFile))

  assert(await nestedPath[FindRoot]('no.such.file') === undefined)
} 

test()