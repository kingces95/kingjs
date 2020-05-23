var {
  '@kingjs': {
    IObserver: { Error },
    '-rx': { SubscribeAndAssert,
      '-async': { Take },
      '-static': { clock, create }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await clock()
    [Take](2)
    [SubscribeAndAssert]([0, 1])

  await clock()
    [Take]()
    [SubscribeAndAssert]()

  await create(function*(o) { o[Error]('error') })
    [Take]()
    [SubscribeAndAssert]()

  await create(function*(o) { o[Error]('error') })
    [Take](1)
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await clock()
    [Take](1)
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})