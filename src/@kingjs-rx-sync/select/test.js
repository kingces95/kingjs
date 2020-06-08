var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': { 
      '-sync': { SubscribeAndAssert, Select, Then, 
        '-static': { of, throws, never }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Select](o => o + 1)
  [SubscribeAndAssert]([1, 2, 3])

throws('error')
  [Select]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [Then](throws('unhandled'))
  [Select]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 1, 2)
  [Select](o => o + 1)
  [SubscribeAndAssert]([1, 2], { terminate: true })

var badSelector = of(1)
  [Select](() => { throw new Error('lol') })
assert.throws(() => badSelector[Subscribe]())