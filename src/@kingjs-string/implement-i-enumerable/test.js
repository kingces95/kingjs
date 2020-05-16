var { assert,
  '@kingjs': {
    IEnumerable,
    IEnumerator,
    '-string': { ImplementIEnumerable }
  }
} = module[require('@kingjs-module/dependencies')]()

String[ImplementIEnumerable]()

var string = '012'

assert(string instanceof IEnumerable)
var enumerator = string[IEnumerable.GetEnumerator]()
assert(enumerator instanceof IEnumerator)

var i = 0
while (enumerator[IEnumerator.MoveNext]())
  assert(enumerator[IEnumerator.Current] == i++)
assert(i == 3)
