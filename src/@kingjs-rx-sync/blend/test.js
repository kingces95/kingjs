var {
  '@kingjs': {
    '-rx': { 
      '-static': { never },
      '-sync': { Blend, SubscribeAndAssert,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0)
  [Blend](of(1), of(2))
  [SubscribeAndAssert]([0, 1, 2])

of()
  [Blend]()
  [SubscribeAndAssert]()

throws('error')
  [Blend](of(0))
  [SubscribeAndAssert](null, { error: 'error' })

of(0)
  [Blend](of(1), throws('error'), never())
  [SubscribeAndAssert]([0, 1], { error: 'error' })

var cancel = of(0)
  [Blend](of(1), never())
  [SubscribeAndAssert]([0, 1], { unfinished: true })
cancel()