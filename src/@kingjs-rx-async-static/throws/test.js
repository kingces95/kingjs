var { 
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-async-static': { throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await throws('error')
    [SubscribeAndAssert]([], { error: 'error' })

  await throws()
    [SubscribeAndAssert]([], { error: null })

  var cancel = await throws()
    [SubscribeAndAssert](null, { terminate: true })
  cancel()
})
