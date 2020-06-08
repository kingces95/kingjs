var {
  '@kingjs': {
    '-rx': { 
      '-sync': { SubscribeAndAssert, Skip, Then, 
        '-static': { of, throws, never }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Skip](1)
  [SubscribeAndAssert]([1, 2])

of(0, 1, 2)
  [Skip](1)
  [SubscribeAndAssert]([1], { terminate: true })

throws('error')
  [Skip]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [Skip]()
  [SubscribeAndAssert](null, { terminate: true })