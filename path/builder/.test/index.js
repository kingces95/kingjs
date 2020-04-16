var assert = require('assert')
var { sep: Sep } = require('path')
var Path = require('..')

var { Relative, Root, Parent, Cwd } = Path

var paths = []

assert.isConsistent = function(path, name, toString) {
  paths.push(path)
  assert.equal(path.to(undefined), path)
  assert.equal(path.to(null), path)
  assert.equal(path.to(''), path)
  assert.equal(Path.create(path), path)
  assert.equal(path.toString(), toString)
  assert.equal(path.name, name)
  assert.ok(path.equals(path))
  assert.ok(path.isAbsolute || path.isRelative)
  assert.notEqual(path.isAbsolute, path.isRelative)
  assert.equal(path.toString(), path.buffer.toString())
  assert.equal(path.to('.'), path)
  assert.equal(path.to('/'), Root)
  assert.equal(path.to('foo/..'), path)
  assert.equal(path.to('./foo/./../.'), path)
  assert.equal(path.toRelative(path), Relative)
  assert.equal(path.toRelative(path), Relative)
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
  assert.ok(path.toRelative(path.dir).equals(Parent))
  assert.ok(path.toRelative(path.dir.to('moo')).equals(Parent.to('moo')))
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

assert.isRoot(Root, '/', '/')
assert.ok(Root.isRoot)
assert.ok(Root.isRoot)
assert.ok(Root.isAbsolute)
assert.equal(Root.basename, '')
assert.equal(Root.ext, '')

assert.isRoot(Relative, '.', '.')
assert.ok(Relative.isCwd)
assert.ok(Relative.isRelative)
assert.ok(Relative.equals(Path.create('')))
assert.equal(Relative.basename, '.')
assert.equal(Relative.ext, '')

var Back = Path.Parent
assert.isConsistent(Back, '..', '..')
assert.ok(Back.isRelative)
assert.ok(Back.isRelativeParent)
assert.equal(Back.basename, '..')
assert.equal(Back.ext, '')
assert.ok(Back.toRelative('foo') === undefined)

var backFoo = Back.to('foo')
assert.isSegment(backFoo, 'foo', `..${Sep}foo`, Back)

var backBack = Relative.to(`..${Sep}..`)
assert.isConsistent(backBack, '..', `..${Sep}..`, Back)

var relFoo = Relative.to('foo')
assert.isSegment(relFoo, 'foo', 'foo', Relative)

var foo = Root.to('foo')
assert.isSegment(foo, 'foo', `${Sep}foo`, Root)

var fooBar = foo.to('bar')
assert.isMultiSegment(fooBar, 'bar', `${Sep}foo${Sep}bar`, foo, Root)
assert.ok(fooBar.equals(Root.to('foo/bar')))

var relFooBar = Path.create(`.${Sep}foo${Sep}bar`)
assert.isMultiSegment(relFooBar, 'bar', `foo${Sep}bar`, relFoo, Relative)

var relFooJs = Relative.to('foo.js')
assert.isSegment(relFooJs, 'foo.js', 'foo.js', Relative)
assert.equal(relFooJs.basename, 'foo')
assert.equal(relFooJs.ext, '.js')

var rootToCwd = Root.toRelative(Cwd)
assert.ok(rootToCwd.isRelative)
assert.ok(Root.to(rootToCwd).equals(Cwd))

var cwdToRelFoo = Cwd.toRelative(relFoo)
assert.ok(rootToCwd.isRelative)
assert.ok(cwdToRelFoo.equals(relFoo))

for (var i = 0; i < paths.length; i++) {
  for (var j = 0; j < paths.length; j++) {
    var left = paths[i]
    var right = paths[j]
    assert.equal(i == j, left.equals(right))
    assert.equal(i == j, right.equals(left))
  }
}

assert(Root.to('..') === undefined)
assert.equal(Path.Cwd.toString(), process.cwd())