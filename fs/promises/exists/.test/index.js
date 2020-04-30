var assert = require('assert')
var Path = require('@kingjs/path')
var Exists = require('..')
var Unlink = require('@kingjs/fs.promises.file.unlink')
var ReadFile = require('@kingjs/fs.promises.file.read')
var WriteFile = require('@kingjs/fs.promises.file.write')

async function test() {
  var path = Path.parse('acme.txt')

  await path[WriteFile]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]('acme.txt')
  assert.ok(!await path[Exists]())
}
test()
