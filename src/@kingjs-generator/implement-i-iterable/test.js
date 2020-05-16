var { assert,
  '@kingjs': {
    IIterable,
    '-generator': { Generator, ImplementIIterable },
  }
} = module[require('@kingjs-module/dependencies')]()

Generator[ImplementIIterable]()

function* generator() { yield 0 }
assert(generator instanceof IIterable)

var iterator = generator[Symbol.iterator]()
assert(iterator)

var next
assert(next = iterator.next(), !next.done)
assert(next.value == 0)
assert(next = iterator.next(), next.done)
