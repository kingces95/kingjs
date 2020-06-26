var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert: SubscribeAndAssertAsync,
      '-sync': { Take, SubscribeAndAssert, Tap,
        '-static': { of, throws }
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Take](2)
  [SubscribeAndAssert]([0, 1])

of(0, 1)
  [Take]()
  [SubscribeAndAssert]()

throws('error')
  [Take]()
  [SubscribeAndAssert](null, { error: 'error' })

throws('error')
  [Take](1)
  [SubscribeAndAssert](null, { error: 'error' })

of(0, 1)
  [Take](1)
  [SubscribeAndAssert]([0], { terminate: true })

// take does not cancel it's subscription
of(0, 1)
  [Tap](o => o[SubscribeAndAssertAsync]([0, 1]))
  [Take](1)
  [SubscribeAndAssert]([0])