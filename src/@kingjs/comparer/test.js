var { assert,
  '@kingjs': { lessThan, equal, getHashcode,
    Comparer,
    IComparer: { Equals, GetHashcode, IsLessThan },
    IComparable
  }
} = module[require('@kingjs-module/dependencies')]()

assert.test = function(comparer, a, b, c) {
  assert.ok(lessThan(a, b) == comparer[IsLessThan](a, b))
  assert.ok(lessThan(b, a) == comparer[IsLessThan](b, a))
  assert.ok(equal(a, b) == comparer[Equals](a, b))
  assert.ok(equal(a, c) == comparer[Equals](a, c))
  assert.equal(getHashcode(a), comparer[GetHashcode](a))
  assert.equal(getHashcode(b), comparer[GetHashcode](b))
  assert.equal(getHashcode(c), comparer[GetHashcode](c))
  assert.equal(getHashcode(c), comparer[GetHashcode](c))
}

class Key {
  constructor(value) {
    this.value = value
  }

  [IComparable.GetHashcode]() { return 0 }
  [IComparable.Equals](other) { return this.value == other.value }
  [IComparable.IsLessThan](other) { return this.value < other.value }
}

var comparer = Comparer.default
assert.test(comparer, 0, 0, 1)
assert.test(comparer, 'a', 'a', 'b')
assert.test(comparer, false, false, true)
assert.test(comparer, Buffer.from('a'), Buffer.from('a'), Buffer.from('b'))
assert.test(comparer, new Key(0), new Key(0), new Key(1))

var comparer = Comparer.createUsingKeySelector(o => o.key)
assert.ok(!comparer[IsLessThan]({ key: 0 }, { key: 0 }))
assert.ok(comparer[IsLessThan]({ key: 0 }, { key: 1 }))