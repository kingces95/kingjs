var {
  '@kingjs': {
    '-rx': { 
      '-sync': { Cancel, SubscribeAndAssert, 
        '-static': { of, throws, never },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Cancel]()
  [SubscribeAndAssert]([0], { abandon: true })

throws('error')
  [Cancel]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [Cancel]()
  [SubscribeAndAssert](null, { terminate: true })