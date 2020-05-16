var { assert,
  '@kingjs': {
    '-linq': { empty, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var array = empty()[ToArray]()
assert.equal(array.length, 0)