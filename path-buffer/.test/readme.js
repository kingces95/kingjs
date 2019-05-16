var assert = require('assert')
var Path = require('path')
var PathBuffer = require('..')

var Sep = Path.sep

var parseAbsolute = Path.parse('/')
var parseRelative = Path.parse('.')

var root = PathBuffer.create()
var foo = root.joinWith('foo')
var bar = foo.joinWith('bar')
assert(bar.path == `foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`.${Sep}foo${Sep}bar`)
assert(pathBuffer.path == `foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`foo${Sep}bar`)
assert(pathBuffer.path == `foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`${Sep}foo${Sep}bar`)
assert(pathBuffer.path == `${Sep}foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`${Sep}foo${Sep}..`)
assert(pathBuffer.pathAsDir == `${Sep}`)

var pathBuffer = PathBuffer.create(`${Sep}`)
assert(pathBuffer.dir === undefined)
assert(pathBuffer.name == ``)
assert(pathBuffer.path == `${Sep}`)
assert(pathBuffer.pathAsDir == `${Sep}`)

var pathBuffer = PathBuffer.create(``)
assert(pathBuffer.dir == undefined)
assert(pathBuffer.name == `.`)
assert(pathBuffer.path == `.`)
assert(pathBuffer.pathAsDir == ``)

function test(pathBuffer, isRelative) {
  assert(pathBuffer.buffer.toString() == pathBuffer.toString())
  assert(pathBuffer.buffer.toString() == pathBuffer.path)
  assert(pathBuffer.isAbsolute != isRelative)
  assert(pathBuffer.bufferAsDir.toString() == pathBuffer.pathAsDir)
}

function testComposite(pathBuffer, root, name, isRelative) {
  assert(pathBuffer.name === name)
  assert(!pathBuffer.isRoot)
  var dir = isRelative ? '' : Sep
  assert(pathBuffer.dir == dir)
  assert(pathBuffer.path == `${dir}${name}`)
  assert(pathBuffer.parent)
  assert(pathBuffer.parent.pathAsDir == pathBuffer.dir)
  assert(!pathBuffer.isRoot)

  test(pathBuffer, isRelative)
}

test(PathBuffer.create('.'), true)
test(PathBuffer.create(''), true)
test(PathBuffer.create(Sep), false)

testComposite(PathBuffer.create('.' + Sep + 'foo'), '', 'foo', true)
testComposite(PathBuffer.create('foo'), '', 'foo', true)
testComposite(PathBuffer.create(Sep + 'foo'), Sep, 'foo', false)
