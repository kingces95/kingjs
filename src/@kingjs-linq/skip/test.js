var { assert,
  '@kingjs': {
    '-linq': { Skip, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var result = [-2, -1, 0, 1, 2][Skip](2)
  var array = result[ToArray]()

  assert(array.length == 3)
  assert(array[0] == 0)
  assert(array[1] == 1)
  assert(array[2] == 2)
}
readme()