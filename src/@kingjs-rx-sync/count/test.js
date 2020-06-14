var { 
  '@kingjs': {
    '-rx': {
      '-sync': { Count, SubscribeAndAssert, 
        '-static': { of, throws, never }
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Count]()
  [SubscribeAndAssert]([2])

of()
  [Count]()
  [SubscribeAndAssert]([0])

throws('error')
  [Count]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [Count]()
  [SubscribeAndAssert](null, { terminate: true })

of(0)
  [Count]()
  [SubscribeAndAssert]([1], { terminate: true })

of(0)
  [Count]()
  [SubscribeAndAssert]([1], { terminate: true })