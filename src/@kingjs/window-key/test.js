var { assert,
  '@kingjs': {
    WindowKey,
    IEquatable,
    IEquatable: { Equals, GetHashcode },
  }
} = module[require('@kingjs-module/dependencies')]()

var a = new WindowKey('a')
assert.ok(a instanceof IEquatable)
assert.ok(a.value == 'a')
assert.ok('previous' in a == false)

var b = new WindowKey('b', a)
assert.ok(b.value == 'b')
assert.ok('previous' in b)
assert.ok(b.previous == 'a')

var bAlt = a.next(b)

assert.ok(!a[Equals](b))
assert.ok(a[GetHashcode]() != b[GetHashcode]())
assert.ok(!b[Equals](bAlt))
assert.ok(b[GetHashcode]() == bAlt[GetHashcode]())