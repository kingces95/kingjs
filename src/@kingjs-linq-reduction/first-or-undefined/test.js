var { assert,
  '@kingjs': {
    '-linq-reduction': { FirstOrUndefined },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  assert([0, 1, 2][FirstOrUndefined]() == 0)
  assert([][FirstOrUndefined]() == undefined)
}
readme()

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1 }
  assert([0, 1, 2][FirstOrUndefined](isOdd) == 1)
  assert([0, 2][FirstOrUndefined](isOdd) == undefined)
}
readmePredicate()