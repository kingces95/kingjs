var {
  '@kingjs': {
    '-rx': { 
      '-sync': { Where, SubscribeAndAssert, 
        '-static': { of, throws, never },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Where](o => o == 1)
  [SubscribeAndAssert]([1])

of(0, 1)
  [Where]()
  [SubscribeAndAssert]([0, 1])

throws('error')
  [Where]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [Where]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 1)
  [Where]()
  [SubscribeAndAssert]([0], { terminate: true })