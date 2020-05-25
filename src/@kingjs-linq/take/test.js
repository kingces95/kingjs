var {
  '@kingjs': {
    '-linq': { Take, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [Take](2)
  [EnumerateAndAssert]([0, 1])