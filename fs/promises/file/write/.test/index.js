var assert = require('assert')
var Path = require('@kingjs/path.builder')
var WriteFile = require('..')
var ReadFile = require('@kingjs/fs.promises.file.read')
var Exists = require('@kingjs/fs.promises.exists')
var Unlink = require('@kingjs/fs.promises.file.unlink')

async function test() {
  var path = Path.Relative.to('acme.txt')

  await path[WriteFile]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]()
  assert.ok(!await path[Exists]())
}
test()
