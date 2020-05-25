var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of()
  [EnumerateAndAssert]()

of(0)
  [EnumerateAndAssert](0)

of(0, 1)
  [EnumerateAndAssert](0, 1)