var { assert,
  '@kingjs': {
    '-linq': { ElementAtOrUndefined },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

assert.equal([0, 1, 2][ElementAtOrUndefined](1), 1)

assert.equal([0, 1, 2][ElementAtOrUndefined](3), undefined)

assert.throws(function() {
  [1, 2, 3][ElementAtOrUndefined](-1)
})