var {
  '@kingjs': {
    '-linq': { Append, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of()[Append]()
  [EnumerateAndAssert](undefined)

of(0)[Append](1)
  [EnumerateAndAssert](0, 1)
