var { assert,
  '@kingjs': {
    '-linq': { Contains },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

assert([1, 2, 3][Contains](2))

var people = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Chris' },
]

var equal = function(l, r) { 
  return l.name == r.name 
}

assert(people[Contains]({ name: 'Chris' }, equal))