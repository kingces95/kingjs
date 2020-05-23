var { assert,
  '@kingjs': {
    '-linq-reduction': { LastOrUndefined },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  assert([1, 2, 3][LastOrUndefined]() == 3)
  assert([][LastOrUndefined]() == undefined)
}
readme()

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1 }
  assert([0, 1, 2, 3, 4][LastOrUndefined](isOdd) == 3)
  assert([0, 2][LastOrUndefined](isOdd) == undefined)
}
readmePredicate()
