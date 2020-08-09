var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    getHashcode
  }
} = module[require('@kingjs-module/dependencies')]()

assert.test = function(a, b, c) {
  assert.equal(getHashcode(a), getHashcode(b))
  assert.notEqual(getHashcode(a), getHashcode(c))
}

class Key {
  constructor(value) {
    this.value = value
  }

  [GetHashcode]() { return this.value }
  [Equals](other) { }
}

assert.test(0, 0, 1)
assert.test('a', 'a', 'b')
assert.test(false, false, true)
assert.test(Buffer.from('a'), Buffer.from('a'), Buffer.from('b'))
assert.test(new Key(0), new Key(0), new Key(1))