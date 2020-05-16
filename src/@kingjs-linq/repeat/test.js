var { assert,
  '@kingjs': {
    '-linq': { repeat, SequenceEqual },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function test(enumerable, array) {
  assert(enumerable[SequenceEqual](array))
}

test(repeat(0, 0), [])
test(repeat(0, 3), [0, 0, 0])