var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { empty }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var ms = 100

process.nextTick(async () => {

  await empty()
    [SubscribeAndAssert]()

  await empty()
    [SubscribeAndAssert](null, { terminate: true })

  await empty({ ms })
    [SubscribeAndAssert](null, { delay: ms })

  await empty({ ms })
    [SubscribeAndAssert](null, { asyncTerminate: true })
})