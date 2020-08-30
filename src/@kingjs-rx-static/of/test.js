var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await of(0, 1, 2)
    [SubscribeAndAssert]([0, 1, 2])

  await of(0, 1, 2)
    [SubscribeAndAssert]([0, 1], { terminate: true })

  await of(0, 1, 2)
    [SubscribeAndAssert]([0, 1, 2], { terminate: true })
})