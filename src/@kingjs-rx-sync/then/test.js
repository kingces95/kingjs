var {
  '@kingjs': {
    '-rx': { 
      '-sync': { Then, SubscribeAndAssert, 
        '-static': { of, throws, never },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Then](of(2, 3))
  [SubscribeAndAssert]([0, 1, 2, 3])

of(0, 1)
  [Then]()
  [SubscribeAndAssert]([0, 1])

never()
  [Then]([0])
  [SubscribeAndAssert](null, { terminate: true })

of(0, 1)
  [Then](of(2, 3))
  [SubscribeAndAssert]([0], { terminate: true })

of(0)
  [Then](never())
  [SubscribeAndAssert]([0], { terminate: true })

of(0, 1)
  [Then](of(2, 3))
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })

throws('error')
  [Then]()
  [SubscribeAndAssert](null, { error: 'error' })