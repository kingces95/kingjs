var {
  '@kingjs': {
    '-linq': { Distinct, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 0, 1, 1, 2, 2)
  [Distinct]()
  [EnumerateAndAssert]([0, 1, 2])

of({ id: 0, name: 'foo' }, { id: 0, name: 'bar' })
  [Distinct](x => x.id)
  [EnumerateAndAssert]([{ id: 0, name: 'foo' }])