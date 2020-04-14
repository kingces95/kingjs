var assert = require('assert')
var Path = require('@kingjs/path.builder')
var MakeDir = require('..')
var Exists = require('@kingjs/fs.promises.exists')
var WriteFile = require('@kingjs/fs.promises.file.write')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')

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
