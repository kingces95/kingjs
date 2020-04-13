var assert = require('assert')
var { sep: Sep } = require('path')
var Path = require('..')

var { Cwd, Root: Abs } = Path

var paths = []

assert.isConsistent = function(path, name, toString) {
  paths.push(path)
  assert.equal(Path.create(path), path)
  assert.equal(path.toString(), toString)
  assert.equal(path.name, name)
  assert.ok(path.equals(path))
  assert.ok(path.isAbsolute || path.isRelative)
  assert.notEqual(path.isAbsolute, path.isRelative)
  assert.equal(path.toString(), path.buffer.toString())
  assert.equal(path.to('.'), path)
  assert.equal(path.to('/'), Abs)
  assert.equal(path.to('foo/..'), path)
  assert.equal(path.to('./foo/./../.'), path)
  assert.ok(path.equals(Path.create(path.toString())))
  assert.equal(path.to('baz.js').name, 'baz.js')

  // cover debug functions
  assert.equal(path.toString(), path.__path)
}

assert.isSegment = function(path, name, toString, parent) {
  assert.isConsistent(path, name, toString)
  assert.ok(path.isSegment)
  assert.ok(path.dir.equals(parent))
  assert.ok(path.to('..').equals(parent))
  assert.ok(path.to('./../.').equals(parent))
  assert.equal(path.isRelative, parent.isRelative)
  assert.equal(path.isAbsolute, parent.isAbsolute)
}

assert.isMultiSegment = function(path, name, toString, parent, grandParent) {
  assert.isSegment(path, name, toString, parent)
  assert.ok(path.dir.dir.equals(grandParent))
  assert.ok(path.to('../..').equals(grandParent))
  assert.ok(path.to('./.././../.').equals(grandParent))
}

assert.isRoot = function(path, name, toString) {
  assert.isConsistent(path, name, toString)
}

assert.isRoot(Abs, '/', '/')
assert.ok(Abs.isRoot)
assert.ok(Abs.isRoot)
assert.ok(Abs.isAbsolute)
assert.equal(Abs.basename, '')
assert.equal(Abs.ext, '')

assert.isRoot(Cwd, '.', '.')
assert.ok(Cwd.isCwd)
assert.ok(Cwd.isRelative)
assert.ok(Cwd.equals(Path.create('')))
assert.equal(Cwd.basename, '.')
assert.equal(Cwd.ext, '')

var Back = Path.Parent
assert.isConsistent(Back, '..', '..')
assert.ok(Back.isRelative)
assert.ok(Back.isRelativeParent)
assert.equal(Back.basename, '..')
assert.equal(Back.ext, '')

var backFoo = Back.to('foo')
assert.isSegment(backFoo, 'foo', `..${Sep}foo`, Back)

var relFoo = Cwd.to('foo')
assert.isSegment(relFoo, 'foo', 'foo', Cwd)

var foo = Abs.to('foo')
assert.isSegment(foo, 'foo', `${Sep}foo`, Abs)

var fooBar = foo.to('bar')
assert.isMultiSegment(fooBar, 'bar', `${Sep}foo${Sep}bar`, foo, Abs)
assert.ok(fooBar.equals(Abs.to('foo/bar')))

var relFooBar = Path.create(`.${Sep}foo${Sep}bar`)
assert.isMultiSegment(relFooBar, 'bar', `foo${Sep}bar`, relFoo, Cwd)

var relFooJs = Cwd.to('foo.js')
assert.isSegment(relFooJs, 'foo.js', 'foo.js', Cwd)
assert.equal(relFooJs.basename, 'foo')
assert.equal(relFooJs.ext, '.js')

for (var i = 0; i < paths.length; i++) {
  for (var j = 0; j < paths.length; j++) {
    var left = paths[i]
    var right = paths[j]
    assert.equal(i == j, left.equals(right))
    assert.equal(i == j, right.equals(left))
  }
}

assert.throws(() => Abs.to('..'), null, "Cannot navigate from '/' to '..'.")