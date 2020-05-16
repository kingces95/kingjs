var { assert,
  '@kingjs': {
    '-linq': { Take, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var result = [-2, -1, 0, 1, 2][Take](2)
  var array = result[ToArray]()

  assert(array.length == 2)
  assert(array[0] == -2)
  assert(array[1] == -1)
}
readme()