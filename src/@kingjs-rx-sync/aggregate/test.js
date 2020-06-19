var {
  '@kingjs': {
    '-rx': {
      '-sync': { Aggregate, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [Aggregate]((a, o) => a + o, 0)
  [SubscribeAndAssert]([0, 1, 3, 6, 10])

of(1, 2)
  [Aggregate]()
  [SubscribeAndAssert]([1, 2], 0)

throws('error')
  [Aggregate]()
  [SubscribeAndAssert](null, { error: 'error' })

of(0)
  [Aggregate]()
  [SubscribeAndAssert]([0], { terminate: true })

never()
  [Aggregate]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 1, 2, 3, 4)
  [Aggregate]()
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })