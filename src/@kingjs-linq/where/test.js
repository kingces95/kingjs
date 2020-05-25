var {
  '@kingjs': {
    '-linq': { Where, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3)
  [Where](o => o % 2 == 0)
  [EnumerateAndAssert]([0, 2])

of('a', 'b', 'c')
  [Where]((o, i) => i == 1)
  [EnumerateAndAssert](['b'])