var {
  '@kingjs': {
    '-rx': { 
      '-static': { never },
      '-sync': { Then, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1)
    [Then](of(2))
    [SubscribeAndAssert]([0, 1, 2])

  of(0, 1)
    [Then]()
    [SubscribeAndAssert]([0, 1])

  throws('error')
    [Then]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await never()
    [Then]([0])
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()

  var cancel = await of(0)
    [Then](never())
    [SubscribeAndAssert]([0], { unfinished: true })
  cancel()
})