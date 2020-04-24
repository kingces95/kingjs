var assert = require('assert')
var Path = require('@kingjs/path.builder')
var WriteFile = require('..')
var ReadFile = require('@kingjs/fs.file.read')
var Exists = require('@kingjs/fs.exists')
var Unlink = require('@kingjs/fs.file.unlink')

function test() {
  var path = Path.parse('acme.txt')

  path[WriteFile]('Hello World!')
  assert.ok(path[Exists]())

  var actual = path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]()
  assert.ok(!path[Exists]())
}
test()
