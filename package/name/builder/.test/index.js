var assert = require('assert')
var NameBuilder = require('..')
var isBuiltinModule = require('is-builtin-module')
var ReplaceAll = require('@kingjs/string-ex.replace-all')
var Path = require('@kingjs/path.builder')

var builders = []

assert.isConsistent = function(builder, name, fqn) {
  builders.push(builder)

  assert.equal(builder.name, name)
  assert.ok(builder.equals(builder))
  assert.equal(builder.toString(), fqn)
  assert.equal(NameBuilder.parse(builder.toString()).toString(), fqn)
  assert.equal(isBuiltinModule(builder.toString()), builder.isBuiltinModule)
  assert.deepEqual(builder.parts, builder.name.split(builder.isBuiltinModule ? '_' : '-'))
  
  assert.ok(builder.toString().endsWith(builder.namespace))
  assert.equal(builder.toPath().toString(), builder.namespace[ReplaceAll]('.', Path.root))
  assert.equal(builder.toPath('/').toString(), '/' + builder.namespace[ReplaceAll]('.', Path.root))

  var toPath = builder.toPath()
  var fromPath = NameBuilder.fromPath(toPath, builder.scope)
  assert.ok(builder.equals(fromPath))
}

assert.isSegment = function(builder, name, fqn) {
  assert.isConsistent(builder, name, fqn || name)
  assert.ok(!builder.isScope)
}

assert.isMultiSegment = function(builder, name, fqn, parent) {
  assert.isSegment(builder, name, fqn)
  assert.ok(builder.parent.equals(parent))
}

assert.isScopedSegment = function(builder, name, scope, fqn) {
  assert.isSegment(builder, name, fqn)
  assert.equal(builder.scope, scope)
}

assert.isScopedMultiSegment = function(builder, name, scope, fqn, parent) {
  assert.isScopedSegment(builder, name, scope, fqn)
  assert.isMultiSegment(builder, name, fqn, parent); builders.pop()
}

var fs = NameBuilder.create('fs')
assert.isSegment(fs, 'fs')
assert.ok(!fs.equals())
assert.ok(!fs.equals(42))

var fsFoo = fs.to('foo')
assert.isMultiSegment(fsFoo, 'foo', 'fs.foo', fs)

var fs = NameBuilder.create('child_process')
assert.isSegment(fs, 'child_process')
assert.ok(fs.isBuiltinModule)

var foo = NameBuilder.create('foo')
assert.isSegment(foo, 'foo')
assert.ok(!foo.isBuiltinModule)

var acmeFoo = NameBuilder.create('foo', 'acme')
assert.isScopedSegment(acmeFoo, 'foo', 'acme', '@acme/foo')

var acmeFooBar = acmeFoo.to('bar')
assert.isScopedMultiSegment(acmeFooBar, 'bar', 'acme', '@acme/foo.bar', acmeFoo)

var acmeBar = NameBuilder.parse('@acme/bar')
assert.isScopedSegment(acmeBar, 'bar', 'acme', '@acme/bar')

var acmeBarFoo = NameBuilder.parse('@acme/bar.foo')
assert.isScopedMultiSegment(acmeBarFoo, 'foo', 'acme', '@acme/bar.foo', acmeBar)
assert.ok(!acmeFooBar.equals(acmeBarFoo))

for (var i = 0; i < builders.length; i++) {
  for (var j = 0; j < builders.length; j++) {
    var left = builders[i]
    var right = builders[j]
    assert.equal(i == j, left.equals(right))
    assert.equal(i == j, right.equals(left))
  }
}