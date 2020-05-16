var { assert,
  '@kingjs': {
    '-linq': { Last },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  assert([1, 2, 3][Last]() == 3)
  assert.throws(function() {
    last.call(sequence())
  })
}
readme()

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1 }
  assert([0, 1, 2, 3, 4][Last](isOdd) == 3)
  assert.throws(function() {
    [0, 2][Last](isOdd)
  })
}
readmePredicate()
