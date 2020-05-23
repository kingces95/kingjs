var { assert,
  '@kingjs': {
    '-linq-reduction': { ElementAt },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

assert.equal([0, 1, 2][ElementAt](1), 1)

assert.throws(function() {
  [1, 2, 3][ElementAt](3)
})

assert.throws(function() {
  [1, 2, 3][ElementAt](-1)
})