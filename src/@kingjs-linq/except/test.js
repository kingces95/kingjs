var {
  '@kingjs': {
    '-linq': { Except, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 0, 1, 2)
  [Except](of(1, 2))
  [EnumerateAndAssert]([0])

of({ id: 0, name: 'foo' },
   { id: 0, name: 'bar' },
   { id: 1, name: 'baz' })
  [Except](of({ id: 1 }), o => o.id )
  [EnumerateAndAssert]([{ id: 0, name: 'foo' }])