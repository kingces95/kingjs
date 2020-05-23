var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': { 
      '-static': { never },
      '-sync': { SubscribeAndAssert, Select, Then, 
        '-static': { of, throws }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1, 2)
    [Select](o => o + 1)
    [SubscribeAndAssert]([1, 2, 3])

  throws('error')
    [Select]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await never()
    [Then](throws('unhandled'))
    [Select]()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()

  var badSelector = await of(1)
    [Select](() => { throw new Error('lol') })
  assert.throws(() => badSelector[Subscribe]())
})