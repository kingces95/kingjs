var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { empty }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

empty()
  [SubscribeAndAssert]()

empty()
  [SubscribeAndAssert](null, { abort: true })