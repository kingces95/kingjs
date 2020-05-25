var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { ElementAt },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(0, 1, 2)[ElementAt](1), 1)
assert.throws(() => of(1, 2, 3)[ElementAt](3))
assert.throws(() => of(1, 2, 3)[ElementAt](-1))