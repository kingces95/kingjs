var {
  '@kingjs': {
    '-rx': {
      '-sync': { Augment, SubscribeAndAssert, Then,
        '-static': { of, throws, never }
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0)
  [Augment](of(1), of(2))
  [SubscribeAndAssert]([0])

of(0)
  [Then](never())
  [Augment](of(1), of(2))
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })

of()
  [Augment]()
  [SubscribeAndAssert]()

throws('error')
  [Augment](of(0))
  [SubscribeAndAssert](null, { error: 'error' })

of(0)
  [Then](never())
  [Augment](of(1), throws('error'), throws('another error'))
  [SubscribeAndAssert]([0, 1], { error: 'error' })