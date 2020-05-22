var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { timer }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await timer()
    [SubscribeAndAssert]()

  var ms = 50
  await timer(50)
    [SubscribeAndAssert](null, { delay: ms })

  // assert tick happens asynchronously
  var cancel = await timer()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})