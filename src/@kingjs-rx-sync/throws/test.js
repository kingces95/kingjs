var { 
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  throws()
    [SubscribeAndAssert](null, { error: null })
})