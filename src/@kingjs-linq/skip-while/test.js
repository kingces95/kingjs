var {
  '@kingjs': {
    '-linq': { SkipWhile, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [SkipWhile](o => o < 2)
  [EnumerateAndAssert]([2, 3, 4])
  
of(1, 2, 3, 4)
  [SkipWhile]((o, i) => i < 2)
  [EnumerateAndAssert]([3, 4])