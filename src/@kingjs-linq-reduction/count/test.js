var { assert,
  '@kingjs': {
    '-linq-reduction': { Count },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

assert(3 == [1, 2, 3][Count]())

var isOdd = function(o) { return o % 2 == 1 }
assert(2 == [1, 2, 3][Count](isOdd))