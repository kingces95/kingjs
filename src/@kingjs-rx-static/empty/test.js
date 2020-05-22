var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-static': { empty }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  empty()
    [SubscribeAndAssert]()
})