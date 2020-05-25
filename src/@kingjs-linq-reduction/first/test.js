var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { First },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(0, 1, 2)[First](), 0)
assert.throws(() => of()[First]())

var isOdd = x => x % 2 == 1
assert.equal(of(1, 2, 3)[First](isOdd), 1)
assert.throws(() => of(0, 2)[First](isOdd))
