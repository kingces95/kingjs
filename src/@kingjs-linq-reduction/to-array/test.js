var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { ToArray },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.deepEqual(
  of(0, 1, 2)[ToArray](),
  [0, 1, 2]
)