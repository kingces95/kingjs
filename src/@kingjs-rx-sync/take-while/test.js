var {
  '@kingjs': {
    '-rx': {
      '-sync': { TakeWhile, SubscribeAndAssert,
        '-static': { of, throws }
      }, 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [TakeWhile](o => o < 2)
  [SubscribeAndAssert]([0, 1])

of(0)
  [TakeWhile](o => true)
  [SubscribeAndAssert]([0])

of(0, 1)
  [TakeWhile](o => false)
  [SubscribeAndAssert]()

throws('error')
  [TakeWhile](o => true)
  [SubscribeAndAssert](null, { error: 'error' })

of(0, 1)
  [TakeWhile](o => true)
  [SubscribeAndAssert]([0], { terminate: true })