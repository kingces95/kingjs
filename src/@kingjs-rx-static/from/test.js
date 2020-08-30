var { 
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await from([0, 1, 2])
    [SubscribeAndAssert]([0, 1, 2])

  await from([0, 1, 2], { ms: 50 })
    [SubscribeAndAssert]([0, 1, 2], { delay: 50 })

  // cancel before next
  await from([0, 1])
    [SubscribeAndAssert]([0], { terminate: true })

  // cancel before complete
  await from([0, 1])
    [SubscribeAndAssert]([0, 1], { terminate: true })

  // cancel before complete
  await from((function*() { throw 'error' })())
    [SubscribeAndAssert](null, { error: 'error' })
})