var assert = require('assert')
var CopyFile = require('..')
var Path = require('@kingjs/path.builder')
var Exists = require('@kingjs/fs.promises.exists')
var Unlink = require('@kingjs/fs.promises.unlink')
var WriteFile = require('@kingjs/fs.promises.write-file')
var ReadFile = require('@kingjs/fs.promises.read-file')

async function test() {
  var cwd = Path.Cwd
  var acme = cwd.to('acme.txt')
  var ecma = cwd.to('ecma.txt')

  await acme[WriteFile]('Hello World!')
  await acme[CopyFile](ecma)
  assert.ok(await ecma[Exists]())

  assert.equal('Hello World!', await ecma[ReadFile]('utf8'))
  
  await acme[Unlink]()
  assert.ok(!await acme[Exists]())

  await ecma[Unlink]()
  assert.ok(!await ecma[Exists]())
}
test()
