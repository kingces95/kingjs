var { assert,
  '@kingjs': { IEnumerable, IEnumerator,
    '-array': { ImplementIEnumerable }
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var array = [ 0, 1, 2 ]

assert(array instanceof IEnumerable)
var enumerator = array[IEnumerable.GetEnumerator]()
assert(enumerator instanceof IEnumerator)

var i = 0
while (enumerator[IEnumerator.MoveNext]())
  assert(enumerator[IEnumerator.Current] == i++)
assert(i == 3)
