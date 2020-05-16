var { assert,
  '@kingjs': {
    IEnumerable,
    IEnumerator,
    Enumerable,
  }
} = module[require('@kingjs-module/dependencies')]()

var container = [ 0, 1 ]

var enumerable = new Enumerable(
  function moveNextFactory() {
    var i = -1

    return function moveNext() {
      if (i + 1 == container.length)
        return false
      this.current = container[++i]
      return true
    }
  }
)

var enumerator = enumerable[IEnumerable.GetEnumerator]()
assert(enumerator[IEnumerator.MoveNext]())
assert(enumerator[IEnumerator.Current] == 0)
assert(enumerator[IEnumerator.MoveNext]())
assert(enumerator[IEnumerator.Current] == 1)
assert(!enumerator[IEnumerator.MoveNext]())