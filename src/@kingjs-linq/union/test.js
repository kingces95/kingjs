var {
  '@kingjs': {
    '-linq': { Union, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 0, 1, 2)
  [Union](of(0, 1))
  [EnumerateAndAssert]([0, 1, 2])

of(1, 0)
  [Union](of(0, 0, 1, 2))
  [EnumerateAndAssert]([1, 0, 2])

of({ id: 0 }, { id: 1 })
  [Union](of({ id: 0 }, { id: 2 }), o => o.id)
  [EnumerateAndAssert]([{ id: 0 }, { id: 1 }, { id: 2 }])