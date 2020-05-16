var { assert,
  '@kingjs': {
    '-linq': { Any },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var sequence = [0, 1, 2]

assert(sequence[Any]())
assert(sequence[Any](function(o) { return o == 1 }))
assert(!sequence[Any](function(o) { return o == 3 }))