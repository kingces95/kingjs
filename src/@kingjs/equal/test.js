var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    equal
  }
} = module[require('@kingjs-module/dependencies')]()

assert.test = function(a, b, c) {
  assert.ok(equal(a, b))
  assert.ok(!equal(a, c))
}

class Key {
  constructor(value) {
    this.value = value
  }

  [GetHashcode]() { return 0 }
  [Equals](other) { return this.value == other.value }
}

assert.test(0, 0, 1)
assert.test('a', 'a', 'b')
assert.test(false, false, true)
assert.test(Buffer.from('a'), Buffer.from('a'), Buffer.from('b'))
assert.test(new Key(0), new Key(0), new Key(1))