var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Last },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(1, 2, 3)[Last](), 3)

var isOdd = x => x % 2 == 1
assert.equal(of(0, 1, 2, 3, 4)[Last](isOdd), 3)
assert.throws(() => of(0, 2)[Last](isOdd))
