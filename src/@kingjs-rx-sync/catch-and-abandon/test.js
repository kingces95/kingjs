var {
  '@kingjs': {
    '-rx': { 
      '-sync': { CatchAndAbandon, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [CatchAndAbandon]()
  [SubscribeAndAssert]([0, 1])

throws('error')
  [CatchAndAbandon]()
  [SubscribeAndAssert](null, { abandon: true })
