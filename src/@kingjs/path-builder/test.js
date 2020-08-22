var { assert,
  '@kingjs': {
    Path,
    PathBuilder,
    'ISingleton': { IsSingleton },
    'IEquatable': { Equals, GetHashcode },
    'IComparable': { IsLessThan },
  },
} = module[require('@kingjs-module/dependencies')]()

var ForwardSlash = '/'
var BackSlash = '\\'

var paths = []

function test(sep, altSep) {
  assert.isConsistent = function(path, toString) {
    paths.push(path)
    assert.equal(path.to(undefined), path)
    assert.equal(path.to(null), path)
    assert.equal(path.to(''), path)
    assert.equal(path.toString(), toString)
    assert.ok(path[Equals](path))
    assert.ok(path.isAbsolute || path.isRelative)
    assert.notEqual(path.isAbsolute, path.isRelative)
    assert.equal(path.toString(), path.buffer.toString())
    assert.ok(path.to('foo').dir[Equals](path))
    assert.ok(path.toRelative(path)[Equals](dot))
    assert.ok(path.toRelative(path)[Equals](dot))
    assert.equal(path.to('baz.js').name, 'baz.js')

    // cover debug functions
    assert.equal(path.toString(), path.__toString)
  }

  assert.isNamed = function(path, name, toString, parent) {
    assert.isConsistent(path, toString)
    assert.equal(path.name, name)
    assert.ok(path.isNamed)
    assert.ok(path.dir[Equals](parent))
    assert.equal(path.isRelative, parent.isRelative)
    assert.equal(path.isAbsolute, parent.isAbsolute)
    assert.ok(path.toRelative(path.dir)[Equals](dotDot))
    assert.ok(path.toRelative(path.dir.to('moo'))[Equals](dotDot.to('moo')))
  }

  assert.isMultiParent = function(path, name, toString, parent, grandParent) {
    assert.isNamed(path, name, toString, parent)
    assert.ok(path.dir.dir[Equals](grandParent))
  }

  var dot = PathBuilder.createRelative(sep)
  var altDot = PathBuilder.createRelative(altSep)
  assert.ok(altDot[Equals](dot))
  assert.isConsistent(dot, '.', '.')
  assert.ok(dot.isDot)
  assert.ok(dot.isRelative)
  assert.equal(dot.basename, undefined)
  assert.equal(dot.ext, undefined)

  var root = PathBuilder.createRoot(sep)
  var altRoot = PathBuilder.createRoot(altSep)
  assert.ok(!altRoot[Equals](root))
  assert.ok(dot.to(root)[Equals](root))
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
  assert.ok(relFoo.to(dotDot)[Equals](dot))

  var foo = root.to('foo')
  assert.isNamed(foo, 'foo', `${sep}foo`, root)
  assert.ok(!foo.prefixBuffer)

  var fooBar = foo.to('bar')
  assert.isMultiParent(fooBar, 'bar', `${sep}foo${sep}bar`, foo, root)
  assert.ok(fooBar[Equals](root.to('foo').to('bar')))

  var relFooBar = dot.to('foo').to('bar')
  assert.isMultiParent(relFooBar, 'bar', `foo${sep}bar`, relFoo, dot)

  var relFooJs = dot.to('foo.js')
  assert.isNamed(relFooJs, 'foo.js', 'foo.js', dot)
  assert.equal(relFooJs.basename, 'foo')
  assert.equal(relFooJs.ext, '.js')

  var relBar = dot.to('bar')
  assert.ok(relFoo.toRelative(relBar)[Equals](dotDot.to(relBar)))

  var http = 'http://foo.bar'
  var httpRoot = PathBuilder.createRoot(sep, http)
  assert.isConsistent(httpRoot, `http://foo.bar${sep}`)

  var fileColon = 'file:'
  var fileRoot = PathBuilder.createRoot(sep, fileColon)

  var fileFoo = fileRoot.to('foo')

  assert.isConsistent(fileRoot, `file:${sep}`)
  assert.ok(fileRoot.prefix == fileColon)
  assert.ok(fileFoo.prefix == fileColon)
  assert.isNamed(fileFoo, 'foo', `file:${sep}foo`, fileRoot, fileColon)

  // absolute to absolute
  var rootToFooBar = root.toRelative(fooBar)
  assert.ok(rootToFooBar.isRelative)
  assert.ok(root.to(rootToFooBar)[Equals](fooBar))

  // relative to relative
  var relFooBarToRelFoo = relFooBar.toRelative(relFoo)
  assert.ok(relFooBarToRelFoo.isRelative)
  assert.ok(relFooBarToRelFoo[Equals](dotDot))

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

    // assert.equal(i == j, left[Equals](right))
    // assert.equal(i == j, right[Equals](left))

    assert.equal(left[IsLessThan](right), (left.toString() < right.toString()))
    assert.equal(right[IsLessThan](left), (right.toString() < left.toString()))
  }
}