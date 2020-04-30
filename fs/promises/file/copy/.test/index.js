var assert = require('assert')
var CopyFile = require('..')
var Path = require('@kingjs/path')
var Exists = require('@kingjs/fs.promises.exists')
var Unlink = require('@kingjs/fs.promises.file.unlink')
var WriteFile = require('@kingjs/fs.promises.file.write')
var ReadFile = require('@kingjs/fs.promises.file.read')

async function test() {
  var cwd = Path.dot
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
