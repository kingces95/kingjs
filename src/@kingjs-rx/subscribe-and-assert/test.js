var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert,
      '-sync-static': { from, never }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from([0, 1, 2])
  [SubscribeAndAssert]([0, 1, 2])

// never()
//   [SubscribeAndAssert]([0])