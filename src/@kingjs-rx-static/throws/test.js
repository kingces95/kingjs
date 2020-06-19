var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { throws }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ms = 100

process.nextTick(async () => {

  await throws('error')
    [SubscribeAndAssert](null, { error: 'error' })

  await throws('error')
    [SubscribeAndAssert](null, { terminate: true })

  await throws('error', Ms)
    [SubscribeAndAssert](null, { error: 'error', delay: Ms })

  await throws('error', Ms)
    [SubscribeAndAssert](null, { error: 'error', asyncTerminate: true })
})