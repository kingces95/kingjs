var {
  '@kingjs': {
    '-rx': {
      '-sync': { Blend, SubscribeAndAssert,
        '-static': { of, throws, never }
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0)
  [Blend](of(1), of(2))
  [SubscribeAndAssert]([0, 1, 2])

of()
  [Blend]()
  [SubscribeAndAssert]()

throws('error')
  [Blend](of(0))
  [SubscribeAndAssert](null, { error: 'error' })

of(0)
  [Blend](of(1), throws('error'), throws('another error'))
  [SubscribeAndAssert]([0, 1], { error: 'error' })

of(0)
  [Blend](of(1), never())
  [SubscribeAndAssert]([0, 1], { terminate: true })

of(0)
  [Blend](of(1))
  [SubscribeAndAssert]([0, 1], { terminate: true })