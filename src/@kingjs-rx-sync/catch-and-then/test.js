var {
  '@kingjs': {
    '-rx': { 
      '-sync': { Then, CatchAndThen, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

throws('error')
  [CatchAndThen]()
  [SubscribeAndAssert]()

of(0, 1)
  [Then](throws('error'))
  [CatchAndThen](of(2, 3))
  [SubscribeAndAssert]([0, 1, 2, 3])

throws('error')
  [CatchAndThen](of(0, 1))
  [SubscribeAndAssert]([0, 1])

throws('error')
  [CatchAndThen](of(0))
  [SubscribeAndAssert]([0], { terminate: true })
