var {
  '@kingjs': {
    '-rx': {
      '-sync': { Distinct, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 0, 1, 2)
  [Distinct]()
  [SubscribeAndAssert]([0, 1, 2])

throws('error')
  [Distinct]()
  [SubscribeAndAssert](null, { error:'error' })

of(0, 1, 2)
  [Distinct]()
  [SubscribeAndAssert]([0], { terminate: true })