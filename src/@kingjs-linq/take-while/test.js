var {
  '@kingjs': {
    '-linq': { TakeWhile, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [TakeWhile](o => o < 2)
  [EnumerateAndAssert]([0, 1])
  
of(1, 2, 3, 4)
  [TakeWhile]((o, i) => i < 2)
  [EnumerateAndAssert]([1, 2])