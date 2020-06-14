var {
  '@kingjs': {
    '-rx': { 
      '-sync': { SelectMany, SubscribeAndAssert,
        '-static': { of, throws, never },
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of()
  [SelectMany]()
  [SubscribeAndAssert]()

of(of())
  [SelectMany]()
  [SubscribeAndAssert]()

of(0, 1, 2)
  [SelectMany](o => of(o + 1))
  [SubscribeAndAssert]([1, 2, 3])

of(of(0), of(1), of(2))
  [SelectMany]()
  [SubscribeAndAssert]([0, 1, 2])

throws('error')
  [SelectMany]()
  [SubscribeAndAssert](null, { error: 'error' })

of(throws('error'))
  [SelectMany]()
  [SubscribeAndAssert](null, { error: 'error' })

of(of(0), throws('error'))
  [SelectMany]()
  [SubscribeAndAssert]([0], { error: 'error' })

of(of(0, 1), throws('error'), of(2))
  [SelectMany]()
  [SubscribeAndAssert]([0, 1], { error: 'error' })

of(of(0), never(), of(1))
  [SelectMany]()
  [SubscribeAndAssert]([0, 1], { terminate: true })

// of('a0', 'a1', 'b0', 'c0')
//   [GroupBy](o => o[0])
//   [SelectMany](o => o, (o, g) => `${g[Key]}.${o}`)
//   [SubscribeAndAssert](['a.a0', 'a.a1', 'b.b0', 'c.c0'])

// assert.throws(() => {
//   ofSync()
//     [SelectMany]()
//     [SubscribeAndAssert]()
// })
