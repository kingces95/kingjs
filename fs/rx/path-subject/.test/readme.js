var assert = require('assert')
var Path = require('path')
var Select = require('@kingjs/rx.select')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('..')

var Dot = '.'
var root = PathSubject.Root
assert(root.isRoot)
assert(root.parent === null)
assert(root.basename === Dot)
assert(root.toString() == root.path)
assert(root.buffer.toString() === root.path)
assert(root.buffer.toString() === Dot)

assert(new PathSubject('foo').root = root)

var root = new PathSubject()
assert(root.isRoot)
assert(root.parent === null)
assert(root.basename === Dot)
assert(root.toString() == root.path)
assert(root.buffer.toString() === root.path)
assert(root.buffer.toString() === Dot)

var Foo = 'foo'
var foo = new PathSubject(Foo, root)
assert(!foo.isRoot)
assert(foo.parent == root)
assert(foo.dir === Dot)
assert(foo.basename === Foo)
assert(foo.toString() == foo.path)
assert(foo.buffer.toString() === foo.path)
assert(foo.buffer.toString() === Foo)

var keys = []
for (var o in foo)
  keys.push(o)

var Bar = 'bar'
var bar = new PathSubject(Bar, foo)
assert(!bar.isRoot)
assert(bar.parent == foo)
assert(bar.dir === foo.path)
assert(bar.basename === Bar)
assert(bar.buffer.toString() === bar.path)
assert(bar.buffer.toString() === Path.join(foo.path, bar.basename))

var Baz = 'baz'
var baz = new PathSubject(Baz, bar)
assert(!baz.isRoot)
assert(baz.parent == bar)
assert(baz.dir === bar.path)
assert(baz.basename === Baz)
assert(baz.buffer.toString() === baz.path)
assert(baz.buffer.toString() === Path.join(bar.path, baz.basename))

var result = []
root[Subscribe](o => result.push(o))
root[Complete]()
assert.deepEqual(result, [ ])

// var result = []
// var zero = new PathSubject('.', null, o => o[Select](x => x + 1))
// zero[Subscribe](o => result.push(o))
// zero[Next](0)
// zero[Complete]()
// assert.deepEqual(result, [ 1 ])
