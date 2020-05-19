var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert,
      '-static': { from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from([0, 1, 2])
  [SubscribeAndAssert]([0, 1, 2])