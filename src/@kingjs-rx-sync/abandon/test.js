var {
  '@kingjs': {
    '-rx': { 
      '-sync': { Abandon, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Abandon]()
  [SubscribeAndAssert]([0, 1], { abandon: true })

throws('error')
  [Abandon]()
  [SubscribeAndAssert](null, { abandon: true })
