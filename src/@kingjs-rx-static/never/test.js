var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert,
      '-static': { never },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  
  await never()
    [SubscribeAndAssert](null, { terminate: true })
  
  await never()
    [SubscribeAndAssert](null, { asyncTerminate: true })}
)