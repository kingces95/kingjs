var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { counter }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await counter(3)
    [SubscribeAndAssert]([0, 1, 2])

  await counter()
    [SubscribeAndAssert](null, { terminate: true })

  await counter(10)
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true })

  var ms = 50
  await counter(10, { ms })
    [SubscribeAndAssert]([ 0, 1, 2 ], { terminate: true, delay: ms })

  await counter(Number.MAX_VALUE, { pollMs: 50 })
    [SubscribeAndAssert](null, { terminate: true, delay: ms })
})