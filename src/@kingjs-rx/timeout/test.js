var {
  '@kingjs': {
    '-rx': { Timeout, SubscribeAndAssert,
      '-static': { clock }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await clock(100)
    [Timeout](75, 'error')
    [SubscribeAndAssert](null, { error: 'error', delay: 75 })

  await clock(75)
    [Timeout](100, 'error')
    [SubscribeAndAssert]([0], { error: 'error' })
})