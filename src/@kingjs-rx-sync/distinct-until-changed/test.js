var {
  '@kingjs': {
    '-rx': {
      '-sync': { DistinctUntilChanged, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 0, 1, 2, 2, 1)
  [DistinctUntilChanged]()
  [SubscribeAndAssert]([0, 1, 2, 1])

throws('error')
  [DistinctUntilChanged]()
  [SubscribeAndAssert](null, { error:'error' })

never()
  [DistinctUntilChanged]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 0, 1, 2, 2, 1)
  [DistinctUntilChanged]()
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })