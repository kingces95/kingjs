var { assert,
  '@kingjs': {
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-linq': { Concat },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var result = [0, 1][Concat]([1, 2])

var enumerator = result[GetEnumerator]()
assert.ok(enumerator[MoveNext]())
assert.equal(enumerator[Current], 0)

assert.ok(enumerator[MoveNext]())
assert.equal(enumerator[Current], 1)

assert.ok(enumerator[MoveNext]())
assert.equal(enumerator[Current], 1)

assert.ok(enumerator[MoveNext]())
assert.equal(enumerator[Current], 2)

assert.ok(!enumerator[MoveNext]())