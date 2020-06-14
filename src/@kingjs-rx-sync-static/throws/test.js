var { 
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

throws()
  [SubscribeAndAssert](null, { error: null })