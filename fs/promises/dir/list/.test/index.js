var assert = require('assert')
var Path = require('@kingjs/path')
var List = require('..')
var WriteFile = require('@kingjs/fs.promises.file.write')
var MakeDir = require('@kingjs/fs.promises.dir.make')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')

var WithFileTypes = { withFileTypes: true }

async function test() {
  var { dot } = Path
  var acme = dot.to('acme')
  var foo = acme.to('foo.txt')
  var bar = acme.to('bar')

  await acme[MakeDir]()
  await bar[MakeDir]()
  await foo[WriteFile]('Hello World!')

  var list = await acme[List]()
  assert.deepEqual([
    'bar', 'foo.txt'
  ], list.map(o => o.name))

  var { directories, files} = await acme[List](WithFileTypes)
  assert.deepEqual([ 'bar' ], directories.map(o => o.name))
  assert.deepEqual([ 'foo.txt' ], files.map(o => o.name))
  
  await acme[RemoveDir]()
}
test()
