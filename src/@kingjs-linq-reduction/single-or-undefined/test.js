var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { SingleOrUndefined },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(0)[SingleOrUndefined](), 0)
assert.equal(of()[SingleOrUndefined](), undefined)
assert.equal(of(0, 1)[SingleOrUndefined](), undefined)

var isOdd = x => x % 2 == 1 
assert.equal(of(0, 1, 2)[SingleOrUndefined](isOdd), 1)
assert.equal(of()[SingleOrUndefined](isOdd), undefined)
assert.equal(of(0)[SingleOrUndefined](isOdd), undefined)
assert.equal(of(0, 1, 2, 3)[SingleOrUndefined](isOdd), undefined)

