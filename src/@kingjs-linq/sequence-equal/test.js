var { assert,
  '@kingjs': {
    '-linq': { SequenceEqual,
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.sequenceEqual = (l, r, e) => l[SequenceEqual](r, e)
assert.sequenceNotEqual = (l, r, e) => !assert.sequenceEqual(l, r, e)

assert.sequenceEqual(of(), of())
assert.sequenceEqual(of(1, 2, 3), of(1, 2, 3))

assert.sequenceNotEqual(of(1, 2, 3), of(2, 3, 1))
assert.sequenceNotEqual(of(1, 2, 3), of(1, 2))
assert.sequenceNotEqual(of(1, 2, 3), of(1, 2, 3, 4))

var myEqual = function(l,r) { return l == -r }
assert.sequenceEqual(of(1), of(-1), myEqual)
assert.sequenceNotEqual(of(1), of(1), myEqual)