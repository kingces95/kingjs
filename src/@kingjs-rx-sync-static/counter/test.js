var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, Take,
      '-static': { counter }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

counter()
  [Take](3)
  [SubscribeAndAssert]([0, 1, 2])

counter()
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })
