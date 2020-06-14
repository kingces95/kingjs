var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { clock }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await clock()
    [SubscribeAndAssert](null, { terminate: true })

  await clock()
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true })

  var ms = 50
  await clock(ms)
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true, delay: ms })

  await clock(Number.MAX_VALUE, { pollMs: 50 })
    [SubscribeAndAssert](null, { terminate: true, delay: ms })
})