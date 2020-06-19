var {
  '@kingjs': {
    '-rx': { 
      '-sync': { ThenAbandon, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [ThenAbandon]()
  [SubscribeAndAssert]([0, 1], { abandon: true })

throws('error')
  [ThenAbandon]()
  [SubscribeAndAssert](null, { error: 'error' })
