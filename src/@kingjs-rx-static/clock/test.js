var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { clock }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  var cancel = await clock()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()

  var cancel = await clock()
    [SubscribeAndAssert]([ 0, 1, 2 ], { unfinished: true })
  cancel()

  var ms = 50
  var cancel = await clock(ms)
    [SubscribeAndAssert]([ 0, 1, 2 ], { unfinished: true, delay: ms })
  cancel()

  var cancel = await clock(Number.MAX_VALUE, { pollMs: 50 })
    [SubscribeAndAssert](null, { unfinished: true, delay: ms })
  cancel()
})