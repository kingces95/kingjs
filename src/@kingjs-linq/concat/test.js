var {
  '@kingjs': {
    '-linq': { Concat, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0)[Concat](of(1))
  [EnumerateAndAssert]([0, 1])

of(0, 1)[Concat](of(2, 3))
  [EnumerateAndAssert]([0, 1, 2, 3])