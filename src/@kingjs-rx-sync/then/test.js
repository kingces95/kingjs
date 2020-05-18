var {
  '@kingjs': {
    '-rx': { 
      '-sync': { Then, SubscribeAndAssert}, 
      '-static': { of, timer, throws },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Then](of(2))
  [SubscribeAndAssert]([0, 1, 2])

of(0, 1)
  [Then]()
  [SubscribeAndAssert]([0, 1])

throws('error')
  [Then]()
  [SubscribeAndAssert](null, { error: 'error' })

var cancel = timer()
  [Then]([0])
  [SubscribeAndAssert](null, { unfinished: true })
cancel()

var cancel = of(0)
  [Then](timer())
  [SubscribeAndAssert]([0], { unfinished: true })
cancel()