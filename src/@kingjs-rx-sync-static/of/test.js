var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [SubscribeAndAssert]([0, 1, 2])

of(0, 1, 2)
  [SubscribeAndAssert]([0, 1], { terminate: true })

of(0, 1, 2)
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })