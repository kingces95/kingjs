var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { throws }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var ms = 100

process.nextTick(async () => {

  await throws('error')
    [SubscribeAndAssert](null, { error: 'error' })

  await throws('error')
    [SubscribeAndAssert](null, { terminate: true })

  await throws('error', { ms })
    [SubscribeAndAssert](null, { error: 'error', delay: ms })

  await throws('error', { ms })
    [SubscribeAndAssert](null, { error: 'error', asyncTerminate: true })
})