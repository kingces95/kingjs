var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Single },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(0)[Single](), 0)
assert.throws(() => of()[Single]())
assert.throws(() => of(0, 1)[Single]())

var isOdd = x => x % 2 == 1 
assert.equal(of(0, 1, 2)[Single](isOdd), 1)
assert.throws(() => of()[Single](isOdd))
assert.throws(() => of(0)[Single](isOdd))
assert.throws(() => of(0, 1, 3)[Single](isOdd))
