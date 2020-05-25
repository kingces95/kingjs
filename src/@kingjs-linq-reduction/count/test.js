var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Count },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(3, of(1, 2, 3)[Count]())
assert.equal(2, of(1, 2, 3)[Count](o => o % 2 == 1))