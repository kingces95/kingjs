var { 
  '@kingjs': {
    '-rx': {
      '-static': { clock },
      '-sync': { Count, SubscribeAndAssert, 
        '-static': { of, throws }
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

var cancel = clock()
  [Count]()
  [SubscribeAndAssert](null, { unfinished: true })
cancel()