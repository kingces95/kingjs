var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { range }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

range(0, 0)
  [EnumerateAndAssert]()

range(0, 3)
  [EnumerateAndAssert](0, 1, 2)

range(-2, 2)
  [EnumerateAndAssert](-2, -1)