var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { counter }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await counter()
    [SubscribeAndAssert](null, { terminate: true })

  await counter()
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true })

  var ms = 50
  await counter(ms)
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true, delay: ms })

  await counter(Number.MAX_VALUE, { pollMs: 50 })
    [SubscribeAndAssert](null, { terminate: true, delay: ms })
})