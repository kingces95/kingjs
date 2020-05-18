var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': { 
      '-sync': { SubscribeAndAssert, Select, Then }, 
      '-static': { of, timer, throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Select](o => o + 1)
  [SubscribeAndAssert]([1, 2, 3])

throws('error')
  [Select]()
  [SubscribeAndAssert](null, { error: 'error' })

var cancel = timer()
  [Then](throws('unhandled'))
  [Select]()
  [SubscribeAndAssert](null, { unfinished: true })
cancel()

var badSelector = of(1)
  [Select](() => { throw new Error('lol') })
assert.throws(() => badSelector[Subscribe]())
