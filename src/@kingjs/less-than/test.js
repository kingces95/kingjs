var { assert,
  '@kingjs': {
    IComparable: { Equals, GetHashcode, IsLessThan },
    lessThan
  }
} = module[require('@kingjs-module/dependencies')]()

assert.test = function(left, right) {
  assert.ok(lessThan(left, right))
  assert.ok(!lessThan(right, left))
}

class Key {
  constructor(value) {
    this.value = value
  }

  [Equals]() { }
  [GetHashcode]() { }
  [IsLessThan](other) {
    return this.value < other.value
  }
}

assert.test(0, 1)
assert.test('a', 'b')
assert.test(false, true)
assert.test(Buffer.from('a'), Buffer.from('b'))
assert.test(new Key(0), new Key(1))