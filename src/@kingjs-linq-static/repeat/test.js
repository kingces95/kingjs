var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { repeat }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

repeat(0, 0)
  [EnumerateAndAssert]()

repeat(0, 3)
  [EnumerateAndAssert]([0, 0, 0])