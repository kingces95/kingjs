var assert = require('assert')
var Path = require('..')
var PathBuilder = require('@kingjs/path-builder')
var { sep: Sep } = require('path')

var { posix, windows } = Path
assert.equal(posix.sep, '/')
assert.equal(windows.sep, '\\')
assert.equal(Path.Builder, PathBuilder)

var { root, dot, dotDot } = Path
var cwd = Path.cwd()

assert.isConsistent = function(path, toString) {
  assert.equal(path.toString(), toString)
  assert.ok(Path.parse(path.toString()).equals(path))
}

assert.isNamed = function(path, name, toString, parent) {
  assert.isConsistent(path, toString)
  assert.equal(path.name, name)
  assert.ok(path.dir.equals(parent))
}

assert.isMultiSegment = function(path, name, toString, parent, grandParent) {
  assert.isNamed(path, name, toString, parent)
  assert.ok(path.dir.dir.equals(grandParent))
}

assert.ok(Path.parse('/').equals(root))
assert.ok(Path.parse('/foo').equals(root.to('foo')))
assert.ok(Path.parse('.').equals(dot))
assert.ok(Path.parse('foo/..').equals(dot))
assert.ok(Path.parse('./foo/./../.').equals(dot))
assert.equal(cwd.toString(), process.cwd())

assert.isConsistent(root, '/')

assert.isConsistent(dot, '.', '.')
assert.ok(dot.equals(Path.parse('')))

var dotDot = Path.dot.dir
assert.isConsistent(dotDot, '..', '..')
//assert.ok(dotDot.toRelative('foo') === undefined)

var backFoo = Path.parse(`..${Sep}foo`)
assert.isNamed(backFoo, 'foo', `..${Sep}foo`, dotDot)

var backBack = Path.parse(`..${Sep}..`)
assert.isConsistent(backBack, `..${Sep}..`, dotDot)

var relFoo = Path.parse('foo')
assert.isNamed(relFoo, 'foo', 'foo', dot)

var foo = Path.parse(`${Sep}foo`)
assert.isNamed(foo, 'foo', `${Sep}foo`, root)

var fooBar = Path.parse(`${Sep}foo${Sep}bar`)
assert.isMultiSegment(fooBar, 'bar', `${Sep}foo${Sep}bar`, foo, root)
assert.ok(fooBar.equals(root.to('foo').to('bar')))

var relFooBar = Path.parse(`.${Sep}foo${Sep}bar`)
assert.isMultiSegment(relFooBar, 'bar', `foo${Sep}bar`, relFoo, dot)

var relFooJs = Path.parse('foo.js')
assert.isNamed(relFooJs, 'foo.js', 'foo.js', dot)

var httpFooBar = Path.posix.create('http://foo.bar')
assert.equal(httpFooBar.toString(), 'http://foo.bar/')

var cDrive = Path.windows.create('c:')
assert.equal(cDrive.toString(), 'c:\\')

var file = Path.create('file:')
assert.equal(file.toString(), `file:${Sep}`)

var PathExtension = Symbol('PathExtension')
var launchArg
PathBuilder.prototype[PathExtension] = function() {
  launchArg = this
}
Path.launch(PathExtension).then(() => {
  assert(launchArg instanceof PathBuilder)
  //assert.equal(launchArg.toString(), path)
})