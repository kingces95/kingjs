var {
  '@kingjs': {
    '-rx': {
      '-sync': { Take, SubscribeAndAssert,
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
  [SubscribeAndAssert]()

throws('error')
  [Take](1)
  [SubscribeAndAssert](null, { error: 'error' })

of(0, 1)
  [Take](1)
  [SubscribeAndAssert]([0], { terminate: true })