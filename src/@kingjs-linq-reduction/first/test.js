var { assert,
  '@kingjs': {
    '-linq-reduction': { First },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  assert([0, 1, 2][First]() == 0)
  assert.throws(function() {
    [][First]()
  })
}
readme()

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1 }
  assert([1, 2, 3][First](isOdd) == 1)
  assert.throws(function() {
    [0, 2][First](isOdd)
  })
}
readmePredicate()
