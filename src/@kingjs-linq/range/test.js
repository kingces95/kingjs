var { assert,
  '@kingjs': {
    '-linq': { range, SequenceEqual },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function test(enumerable, array) {
  assert(enumerable[SequenceEqual](array))
}

test(range(0, 0), [])
test(range(0, 3), [0, 1, 2])
test(range(-2, 2), [-2, -1])