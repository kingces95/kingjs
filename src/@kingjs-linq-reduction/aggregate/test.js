var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Aggregate },
      '-static': { of },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(
  of(2, 3, 4)[Aggregate](1, 
    (a, x) => a + x, o => String(o)
  ), '10'
)