var assert = require('assert')
var Path = require('@kingjs/path.builder')
var Exists = require('..')
var Unlink = require('@kingjs/fs.file.unlink')
var ReadFile = require('@kingjs/fs.file.read')
var WriteFile = require('@kingjs/fs.file.write')

function test() {
  var path = Path.dot.to('acme.txt')

  path[WriteFile]('Hello World!')
  assert.ok(path[Exists]())

  var actual = path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]('acme.txt')
  assert.ok(!path[Exists]())
}
test()
