var assert = require('assert')
var Path = require('@kingjs/path.builder')
var RemoveDir = require('..')
var Exists = require('@kingjs/fs.promises.exists')
var WriteFile = require('@kingjs/fs.promises.write-file')
var MakeDir = require('@kingjs/fs.promises.make-dir')

async function test() {
  var cwd = Path.Cwd
  var acme = cwd.to('acme')
  var foo = acme.to('foo')
  var txt = foo.to('bar.txt')

  await foo[MakeDir]()
  assert.ok(await acme[Exists]())
  assert.ok(await foo[Exists]())
  await txt[WriteFile]('utf8')

  await acme[RemoveDir]()
  assert.ok(!await acme[Exists]())
}
test()
