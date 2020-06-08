var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { clock }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  var cancel = await clock()
    [SubscribeAndAssert](null, { terminate: true })
  cancel()

  var cancel = await clock()
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true })
  cancel()

  var ms = 50
  var cancel = await clock(ms)
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true, delay: ms })
  cancel()

  var cancel = await clock(Number.MAX_VALUE, { pollMs: 50 })
    [SubscribeAndAssert](null, { terminate: true, delay: ms })
  cancel()
})