var assert = require('assert')
var PathBuilder = require('@kingjs/path-builder')
var Singleton = require('@kingjs/singleton')

var ForwardSlash = '/'
var BackSlash = '\\'

var paths = []

function test(sep, altSep) {
  var sepBuffer = Buffer.from(sep)
  var altSepBuffer = Buffer.from(altSep)

  assert.isConsistent = function(path, toString) {
    paths.push(path)
    assert.ok(path instanceof Singleton)
    assert.equal(path.to(undefined), path)
    assert.equal(path.to(null), path)
    assert.equal(path.to(''), path)
    assert.equal(path.toString(), toString)
    assert.ok(path.equals(path))
    assert.ok(path.isAbsolute || path.isRelative)
    assert.notEqual(path.isAbsolute, path.isRelative)
    assert.equal(path.toString(), path.buffer.toString())
    assert.ok(path.to('foo').dir.equals(path))
    assert.ok(path.toRelative(path).equals(dot))
    assert.ok(path.toRelative(path).equals(dot))
    assert.equal(path.to('baz.js').name, 'baz.js')

    // cover debug functions
    assert.equal(path.toString(), path.__toString)
  }

  assert.isNamed = function(path, name, toString, parent) {
    assert.isConsistent(path, toString)
    assert.equal(path.name, name)
    assert.ok(path.isNamed)
    assert.ok(path.dir.equals(parent))
    assert.equal(path.isRelative, parent.isRelative)
    assert.equal(path.isAbsolute, parent.isAbsolute)
    assert.ok(path.toRelative(path.dir).equals(dotDot))
    assert.ok(path.toRelative(path.dir.to('moo')).equals(dotDot.to('moo')))
  }

  assert.isMultiParent = function(path, name, toString, parent, grandParent) {
    assert.isNamed(path, name, toString, parent)
    assert.ok(path.dir.dir.equals(grandParent))
  }

  var dot = PathBuilder.createRelative(sepBuffer)
  var altDot = PathBuilder.createRelative(altSepBuffer)
  assert.isConsistent(dot, '.', '.')
  assert.ok(dot.isDot)
  assert.ok(dot.isRelative)
  assert.equal(dot.basename, undefined)
  assert.equal(dot.ext, undefined)

  // test interning
  assert.equal(dot.to('foo'), dot.to('foo'))

  var root = PathBuilder.createRoot(sepBuffer)
  var altRoot = PathBuilder.createRoot(altSepBuffer)
  assert.ok(dot.to(root).equals(root))
  assert.isConsistent(root, sep)
  assert.ok(root.isRoot)
  assert.ok(root.isAbsolute)
  assert.equal(root.basename, undefined)
  assert.equal(root.ext, undefined)

  var dotDot = dot.dir
  assert.isConsistent(dotDot, '..', '..')
  assert.ok(dotDot.isRelative)
  assert.ok(dotDot.isDotDot)
  assert.equal(dotDot.basename, undefined)
  assert.equal(dotDot.ext, undefined)
  //assert.ok(dotDot.toRelative('foo') === undefined)

  var backFoo = dotDot.to('foo')
  assert.isNamed(backFoo, 'foo', `..${sep}foo`, dotDot)

  var grandParent = dotDot.dir
  assert.isConsistent(grandParent, `..${sep}..`, dotDot)

  var relFoo = dot.to('foo')
  assert.isNamed(relFoo, 'foo', 'foo', dot)
  assert.ok(relFoo.to(dotDot).equals(dot))

  var foo = root.to('foo')
  assert.isNamed(foo, 'foo', `${sep}foo`, root)
  assert.ok(!foo.prefixBuffer)

  var fooBar = foo.to('bar')
  assert.isMultiParent(fooBar, 'bar', `${sep}foo${sep}bar`, foo, root)
  assert.ok(fooBar.equals(root.to('foo').to('bar')))

  var relFooBar = dot.to('foo').to('bar')
  assert.isMultiParent(relFooBar, 'bar', `foo${sep}bar`, relFoo, dot)

  var relFooJs = dot.to('foo.js')
  assert.isNamed(relFooJs, 'foo.js', 'foo.js', dot)
  assert.equal(relFooJs.basename, 'foo')
  assert.equal(relFooJs.ext, '.js')

  var relBarJs = dot.to('bar.js')
  assert.ok(relFooJs.toRelativeFile(relBarJs).equals(relBarJs))

  var relBar = dot.to('bar')
  assert.ok(relFoo.toRelative(relBar).equals(dotDot.to(relBar)))

  var http = Buffer.from('http://foo.bar')
  var httpRoot = PathBuilder.createRoot(sepBuffer, http)
  assert.isConsistent(httpRoot, `http://foo.bar${sep}`)

  var fileColon = Buffer.from('file:')
  var fileRoot = PathBuilder.createRoot(sepBuffer, fileColon)
  var fileFoo = fileRoot.to('foo')
  assert.isConsistent(fileRoot, `file:${sep}`)
  assert.ok(fileRoot.prefixBuffer.equals(fileColon))
  assert.ok(fileFoo.prefixBuffer.equals(fileColon))
  assert.isNamed(fileFoo, 'foo', `file:${sep}foo`, fileRoot, fileColon)

  // absolute to absolute
  var rootToFooBar = root.toRelative(fooBar)
  assert.ok(rootToFooBar.isRelative)
  assert.ok(root.to(rootToFooBar).equals(fooBar))

  // relative to relative
  var relFooBarToRelFoo = relFooBar.toRelative(relFoo)
  assert.ok(relFooBarToRelFoo.isRelative)
  assert.ok(relFooBarToRelFoo.equals(dotDot))

  var altFooBar = altRoot.to('foo').to('bar')
  var altRelFoo = altDot.to('foo')

  // absolute to absolute ignoring separator
  var rootToFooBar = root.toRelative(altFooBar, true)
  assert.ok(rootToFooBar.isRelative)
  assert.ok(root.to(rootToFooBar).equals(fooBar))

  // relative to relative ignoring separator
  var relFooBarToRelFoo = relFooBar.toRelative(altRelFoo, true)
  assert.ok(relFooBarToRelFoo.isRelative)
  assert.ok(relFooBarToRelFoo.equals(dotDot))

  // cover exceptions
  var { NoRelativePathExistsException } = PathBuilder
  assert.throws(
    () => dotDot.toRelative(dot), 
    new NoRelativePathExistsException(dotDot, dot)
  )
  assert.throws(
    () => httpRoot.toRelative(fileRoot), 
    new NoRelativePathExistsException(httpRoot, fileRoot)
  )
}

test(ForwardSlash, BackSlash)
test(BackSlash, ForwardSlash)

for (var i = 0; i < paths.length; i++) {
  for (var j = 0; j < paths.length; j++) {
    var left = paths[i]
    var right = paths[j]

    assert.equal(i == j, left.equals(right))
    assert.equal(i == j, right.equals(left))
    
    if (left.isAbsolute) {
      assert.equal(i == j, left.equals(right), true)
      assert.equal(i == j, right.equals(left), true)
    }
    else {
      var m = paths.length / 2
      assert.equal(i % m == j % m, left.equals(right, true))
      assert.equal(i % m == j % m, right.equals(left, true))
    }
  }
}