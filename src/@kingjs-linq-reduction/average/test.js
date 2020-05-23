var { assert,
  '@kingjs': {
    '-linq-reduction': { Average },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function test(array, result) {
  assert.equal(array[Average](), result)
}

test([2], 2)
test([1, 2, 3], 2)
test([-2, 0, 2], 0)

var empty = []
assert(Number.isNaN(empty[Average]()))

assert(
  [{ value: -1 }, { value: 1 }][Average](
    function (x) { return x.value }
  ) == 0
)