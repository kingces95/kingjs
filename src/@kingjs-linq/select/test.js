var { assert,
  '@kingjs': {
    '-linq': { Select, SequenceEqual },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  function selectLowerCase(x) {
    return String.prototype.toLowerCase.call(x)
  }

  assert(
    ['A', 'B', 'C']
    [Select](selectLowerCase)
    [SequenceEqual](['a', 'b', 'c'])
  )
}
readme()

function appendIndex(x, i) {
  return x + i
}

assert(
  ['A', 'B', 'C']
  [Select](appendIndex)
  [SequenceEqual](['A0', 'B1', 'C2'])
)