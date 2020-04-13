var assert = require('assert')
var Path = require('@kingjs/path.builder')
var Exists = require('..')
var Unlink = require('@kingjs/fs.promises.unlink')
var ReadFile = require('@kingjs/fs.promises.read-file')
var WriteFile = require('@kingjs/fs.promises.write-file')

async function test() {
  var path = Path.Cwd.to('acme.txt')

  await path[WriteFile]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]('acme.txt')
  assert.ok(!await path[Exists]())
}
test()
