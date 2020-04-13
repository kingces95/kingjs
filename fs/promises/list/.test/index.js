var assert = require('assert')
var Path = require('@kingjs/path.builder')
var List = require('..')
var WriteFile = require('@kingjs/fs.promises.write-file')
var MakeDir = require('@kingjs/fs.promises.make-dir')
var RemoveDir = require('@kingjs/fs.promises.remove-dir')

var WithFileTypes = { withFileTypes: true }

async function test() {
  var { Cwd } = Path
  var acme = Cwd.to('acme')
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
