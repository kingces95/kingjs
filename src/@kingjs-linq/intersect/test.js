var {
  '@kingjs': {
    '-linq': { Intersect, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 0, 1, 2)
  [Intersect](of(0, 1))
  [EnumerateAndAssert]([0, 1])

of(1, 0)
  [Intersect](of(0, 0, 1, 2))
  [EnumerateAndAssert]([1, 0])

of({ id: 0 }, { id: 1 })
  [Intersect](of({ id: 0 }, { id: 2 }), o => o.id)
  [EnumerateAndAssert]([{ id: 0 }])