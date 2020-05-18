var {
  '@kingjs': {
    '-rx': { 
      '-sync': { SubscribeAndAssert, Take, Then }, 
      '-static': { of, timer, throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Take](2)
  [SubscribeAndAssert]([0, 1])

throws('error')
  [Take]()
  [SubscribeAndAssert](null, { error: 'error' })

var cancel = timer()
  [Then](throws('unhandled'))
  [Take]()
  [SubscribeAndAssert](null, { unfinished: true })
cancel()
