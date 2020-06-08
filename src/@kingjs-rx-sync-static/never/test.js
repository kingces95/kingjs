var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { never }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

never()
  [SubscribeAndAssert](null, { abort: true })

never()
  [SubscribeAndAssert](null, { terminate: true })
