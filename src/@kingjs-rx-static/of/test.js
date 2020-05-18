var {
  '@kingjs': {
    '-rx': {
      '-sync': { SubscribeAndAssert }, 
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [SubscribeAndAssert]([0, 1, 2])