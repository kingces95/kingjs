var {
  '@kingjs': {
    IObserver: { Error },
    '-rx': { SubscribeAndAssert, TakeWhile, 
      '-static': { clock, create, of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await clock()
    [TakeWhile](o => o < 2)
    [SubscribeAndAssert]([0, 1])

  await of(0)
    [TakeWhile](o => true)
    [SubscribeAndAssert]([0])

  await clock()
    [TakeWhile](o => false)
    [SubscribeAndAssert]()

  await create(function*(o) { o[Error]('error') })
    [TakeWhile](o => true)
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await clock()
    [TakeWhile](o => o < 1)
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})