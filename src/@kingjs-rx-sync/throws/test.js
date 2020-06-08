var { 
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert,
      '-static': { throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

throws('error')
  [SubscribeAndAssert](null, { error: 'error' })

throws('error')
  [SubscribeAndAssert](null, { abort: true })