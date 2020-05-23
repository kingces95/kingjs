var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-async-static': { empty }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  empty()
    [SubscribeAndAssert]()
})