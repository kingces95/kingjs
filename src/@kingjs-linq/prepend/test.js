var { assert,
  '@kingjs': {
    '-linq': { Prepend, SequenceEqual, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var numbers = [1, 2, 3]
  var result = numbers[Prepend](0)
  var array = result[ToArray]()

  assert(
    [0, 1, 2, 3][SequenceEqual](array)
  )
}
readme()