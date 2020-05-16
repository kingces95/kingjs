var { assert,
  '@kingjs': {
    IEnumerable,
    IEnumerator,
    '-module': { ExportShim },
    '-indexable': { Enumerator }
  }
} = module[require('@kingjs-module/dependencies')]()

module[ExportShim](IEnumerable, Array, {
  getEnumerator() { return new Enumerator(this) }
})
var ImplementIEnumerable = module.exports

Array[ImplementIEnumerable]()

var array = [ 0, 1, 2 ]

assert(array instanceof IEnumerable)
var enumerator = array[IEnumerable.GetEnumerator]()
assert(enumerator instanceof IEnumerator)

var i = 0
while (enumerator[IEnumerator.MoveNext]())
  assert(enumerator[IEnumerator.Current] == i++)
assert(i == 3)
