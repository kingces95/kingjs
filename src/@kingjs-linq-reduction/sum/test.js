var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Sum },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(1, 2, 3)[Sum](), 6)
assert.equal(of()[Sum](), 0)