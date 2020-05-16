var { assert,
  '@kingjs': {
    '-linq': { ToArray, Append },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var source = [ 0, 1, 2 ]
var enumerable = source[Append](3)
var result = enumerable[ToArray]()

assert.deepEqual([0, 1, 2, 3], result)