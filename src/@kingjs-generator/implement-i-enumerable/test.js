var { assert,
  '@kingjs': {
    IEnumerable,
    IEnumerator,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-generator': { Generator, ImplementIEnumerable }
  }
} = module[require('@kingjs-module/dependencies')]()

Generator[ImplementIEnumerable]()

function* generator() {
  yield 0
  yield 1
  yield 2
}

assert(generator instanceof IEnumerable)
var enumerator = generator[GetEnumerator]()
assert(enumerator instanceof IEnumerator)

var i = 0
while (enumerator[MoveNext]())
  assert(enumerator[Current] == i++)
assert(i == 3)
