var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { ElementAtOrUndefined },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(0, 1, 2)[ElementAtOrUndefined](1), 1)
assert.equal(of(0, 1, 2)[ElementAtOrUndefined](3), undefined)
assert.throws(() => of(1, 2, 3)[ElementAtOrUndefined](-1))