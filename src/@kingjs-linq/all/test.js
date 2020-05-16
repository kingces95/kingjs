var { assert,
  '@kingjs': {
    '-linq': { All },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var sequence = [0, 1, 2]

assert(sequence[All](function(o) { return o < 3 }))
assert(!sequence[All](function(o) { return o < 2 }))