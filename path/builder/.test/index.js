var assert = require('assert')
var { sep: Sep } = require('path')
var Path = require('..')

var { dot, sep, dotDot, cwd } = Path

var paths = []

assert.isConsistent = function(path, toString) {
  paths.push(path)
  assert.equal(path.to(undefined), path)
  assert.equal(path.to(null), path)
  assert.equal(path.to(''), path)
  assert.equal(Path.parse(path), path)
  assert.equal(path.toString(), toString)
  assert.ok(path.equals(path))
  assert.ok(path.isAbsolute || path.isRelative)
  assert.notEqual(path.isAbsolute, path.isRelative)
  assert.equal(path.toString(), path.buffer.toString())
  assert.equal(path.to('.'), path)
  assert.equal(path.to('/'), sep)
  assert.equal(path.to('foo/..'), path)
  assert.equal(path.to('./foo/./../.'), path)
  assert.equal(path.toRelative(path), dot)
  assert.equal(path.toRelative(path), dot)
  assert.ok(path.equals(Path.parse(path.toString())))
  assert.equal(path.to('baz.js').name, 'baz.js')

  // cover debug functions
  assert.equal(path.toString(), path.__toString)
}

assert.isNamed = function(path, name, toString, parent) {
  assert.isConsistent(path, toString)
  assert.equal(path.name, name)
  assert.ok(path.isNamed)
  assert.ok(path.dir.equals(parent))
  assert.ok(path.to('..').equals(parent))
  assert.ok(path.to('./../.').equals(parent))
  assert.equal(path.isRelative, parent.isRelative)
  assert.equal(path.isAbsolute, parent.isAbsolute)
  assert.ok(path.toRelative(path.dir).equals(dotDot))
  assert.ok(path.toRelative(path.dir.to('moo')).equals(dotDot.to('moo')))
}

assert.isMultiSegment = function(path, name, toString, parent, grandParent) {
  assert.isNamed(path, name, toString, parent)
  assert.ok(path.dir.dir.equals(grandParent))
  assert.ok(path.to('../..').equals(grandParent))
  assert.ok(path.to('./.././../.').equals(grandParent))
}

assert.isConsistent(sep, '/')
assert.ok(sep.isSep)
assert.ok(sep.isAbsolute)
assert.equal(sep.basename, undefined)
assert.equal(sep.ext, undefined)

assert.isConsistent(dot, '.', '.')
assert.ok(dot.isDot)
assert.ok(dot.isRelative)
assert.ok(dot.equals(Path.parse('')))
assert.equal(dot.basename, undefined)
assert.equal(dot.ext, undefined)

var dotDot = Path.dotDot
assert.isConsistent(dotDot, '..', '..')
assert.ok(dotDot.isRelative)
assert.ok(dotDot.isDotDot)
assert.equal(dotDot.basename, undefined)
assert.equal(dotDot.ext, undefined)
//assert.ok(dotDot.toRelative('foo') === undefined)

var backFoo = dotDot.to('foo')
assert.isNamed(backFoo, 'foo', `..${Sep}foo`, dotDot)

var backBack = dot.to(`..${Sep}..`)
assert.isConsistent(backBack, `..${Sep}..`, dotDot)

var relFoo = dot.to('foo')
assert.isNamed(relFoo, 'foo', 'foo', dot)

var foo = sep.to('foo')
assert.isNamed(foo, 'foo', `${Sep}foo`, sep)

var fooBar = foo.to('bar')
assert.isMultiSegment(fooBar, 'bar', `${Sep}foo${Sep}bar`, foo, sep)
assert.ok(fooBar.equals(sep.to('foo/bar')))

var relFooBar = Path.parse(`.${Sep}foo${Sep}bar`)
assert.isMultiSegment(relFooBar, 'bar', `foo${Sep}bar`, relFoo, dot)

var relFooJs = dot.to('foo.js')
assert.isNamed(relFooJs, 'foo.js', 'foo.js', dot)
assert.equal(relFooJs.basename, 'foo')
assert.equal(relFooJs.ext, '.js')

var rootToCwd = sep.toRelative(cwd)
assert.ok(rootToCwd.isRelative)
assert.ok(sep.to(rootToCwd).equals(cwd))

var cwdToRelFoo = cwd.toRelative(relFoo)
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

assert(sep.to('..') === undefined)
assert.equal(Path.cwd.toString(), process.cwd())