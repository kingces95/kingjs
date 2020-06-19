var { assert,
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { never }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

never()
  [SubscribeAndAssert](null, { terminate: true })