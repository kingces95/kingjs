var { 
  '@kingjs': {
    '-rx': {
      '-static': { clock: never },
      '-sync': { Count, SubscribeAndAssert, 
        '-static': { of, throws }
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  of(0, 1)
    [Count]()
    [SubscribeAndAssert]([2])

  of()
    [Count]()
    [SubscribeAndAssert]([0])

  throws('error')
    [Count]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await never()
    [Count]()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})