var assert = require('assert')
var Path = require('@kingjs/path')
var Unlink = require('..')
var ReadFile = require('@kingjs/fs.promises.file.read')
var Exists = require('@kingjs/fs.promises.exists')
var WriteFile = require('@kingjs/fs.promises.file.write')

async function test() {
  var path = Path.parse('acme.txt')

  await path[WriteFile]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]()
  assert.ok(!await path[Exists]())
}
test()
