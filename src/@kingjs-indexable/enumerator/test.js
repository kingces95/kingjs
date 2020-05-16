var { assert,
  '@kingjs': { IEnumerable, IEnumerator,
    '-indexable': { Enumerable }
  }
} = module[require('@kingjs-module/dependencies')]()

var target = [ 0, 1 ]

var enumerable = new Enumerable(target)

var enumerator = enumerable[IEnumerable.GetEnumerator]()
assert(enumerator[IEnumerator.MoveNext]())
assert(enumerator[IEnumerator.Current] == 0)
assert(enumerator[IEnumerator.MoveNext]())
assert(enumerator[IEnumerator.Current] == 1)
assert(!enumerator[IEnumerator.MoveNext]())