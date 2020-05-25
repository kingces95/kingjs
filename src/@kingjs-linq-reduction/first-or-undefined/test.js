var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { FirstOrUndefined },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(0, 1, 2)[FirstOrUndefined](), 0)
assert(of()[FirstOrUndefined]() == undefined)

var isOdd = x => x % 2 == 1
assert.equal(of(0, 1, 2)[FirstOrUndefined](isOdd), 1)
assert.equal(of(0, 2)[FirstOrUndefined](isOdd), undefined)
