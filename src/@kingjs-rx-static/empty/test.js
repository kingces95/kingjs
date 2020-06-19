var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { empty }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ms = 100

process.nextTick(async () => {

  await empty()
    [SubscribeAndAssert]()

  await empty()
    [SubscribeAndAssert](null, { terminate: true })

  await empty(Ms)
    [SubscribeAndAssert](null, { delay: Ms })

  await empty(Ms)
    [SubscribeAndAssert](null, { asyncTerminate: true })
})