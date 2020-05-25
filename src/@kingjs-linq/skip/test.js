var {
  '@kingjs': {
    '-linq': { Skip, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [Skip](2)
  [EnumerateAndAssert]([2, 3, 4])