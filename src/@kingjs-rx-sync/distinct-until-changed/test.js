var {
  '@kingjs': {
    '-rx': {
      '-static': { never },
      '-sync': { DistinctUntilChanged, SubscribeAndAssert,
        '-static': { of, throws },
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

var cancel = never()
  [DistinctUntilChanged]()
  [SubscribeAndAssert](null, { unfinished: true })
cancel()