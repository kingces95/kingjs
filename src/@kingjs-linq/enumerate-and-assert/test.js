var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [EnumerateAndAssert]([0, 1, 2])