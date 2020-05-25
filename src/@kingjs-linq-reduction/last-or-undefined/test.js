var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { LastOrUndefined },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(1, 2, 3)[LastOrUndefined](), 3)
assert.equal(of()[LastOrUndefined](), undefined)

var isOdd = x => x % 2 == 1
assert.equal(of(0, 1, 2, 3, 4)[LastOrUndefined](isOdd), 3)
assert.equal(of(0, 2)[LastOrUndefined](isOdd), undefined)
