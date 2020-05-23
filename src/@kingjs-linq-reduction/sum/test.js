var { assert,
  '@kingjs': {
    '-linq-reduction': { Sum },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var summation = [1, 2, 3][Sum]()
  assert(summation == 6)
}
readme()

function zero() {
  var summation = [][Sum]()
  assert(summation == 0)
}
zero()