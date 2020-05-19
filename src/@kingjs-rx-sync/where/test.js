var {
  '@kingjs': {
    '-rx': { 
      '-static': { timer },
      '-sync': { Where, SubscribeAndAssert, 
        '-static': { of, throws },
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

var cancel = timer()
  [Where]()
  [SubscribeAndAssert](null, { unfinished: true })
cancel()