var {
  '@kingjs': {
    '-rx': { 
      '-static': { timer },
      '-sync': { Zip, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }])

of(0, 1)
  [Zip](function*() { yield 'a' }, (k, v) => ({ k, v }))
  [SubscribeAndAssert]([{ k: 0, v: 'a' }])

of(0, 1)
  [Zip]()
  [SubscribeAndAssert]([])

throws('error')
  [Zip]()
  [SubscribeAndAssert](null, { error: 'error' })

var cancel = timer()
  [Zip]()
  [SubscribeAndAssert](null, { unfinished: true })
cancel()