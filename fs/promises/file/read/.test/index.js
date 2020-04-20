var assert = require('assert')
var Path = require('@kingjs/path.builder')
var ReadFile = require('..')
var Unlink = require('@kingjs/fs.promises.file.unlink')
var Exists = require('@kingjs/fs.promises.exists')
var WriteFile = require('@kingjs/fs.promises.file.write')

async function test() {
  var path = Path.dot.to('acme.txt')

  await path[WriteFile]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]('acme.txt')
  assert.ok(!await path[Exists]())
}
test()
