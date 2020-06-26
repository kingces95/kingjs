var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, Take,
      '-static': { counter }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

counter(3)
  [SubscribeAndAssert]([0, 1, 2])

counter()
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })
