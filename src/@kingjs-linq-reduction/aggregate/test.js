var { assert,
  '@kingjs': {
    '-linq-reduction': { Aggregate },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var sequence = [2, 3, 4]

var result = sequence[Aggregate](1, function(x) {
  return this + x 
}, o => String(o))

assert(result === '10')