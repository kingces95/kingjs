var assert = require('assert')
var Path = require('@kingjs/path')
var ReadFile = require('..')
var Unlink = require('@kingjs/fs.file.unlink')
var Exists = require('@kingjs/fs.exists')
var WriteFile = require('@kingjs/fs.file.write')

function test() {
  var path = Path.parse('acme.txt')

  path[WriteFile]('Hello World!')
  assert.ok(path[Exists]())

  var actual = path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]('acme.txt')
  assert.ok(!path[Exists]())
}
test()
