var {
  '@kingjs': {
    '-rx': { Debounce, SubscribeAndAssert,
      '-static': { counter, throws },
      '-sync': { Blend, SubscribeAndAssert: SyncSubscribeAndAssert,
        '-static': { of }
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var ms = 20

of(0)
  [Debounce](ms)
  [SyncSubscribeAndAssert]()

process.nextTick(async () => {

  var count = 2
  await counter(count, { ms })
    [Debounce](ms * 2)
    [SubscribeAndAssert]([count - 1])

  await counter(count, { ms })
    [Debounce](ms / 2)
    [SubscribeAndAssert]([...Array(count).keys()])

  await counter(count, { ms })
    [Blend](throws('error'))
    [Debounce](ms * 2)
    [SubscribeAndAssert](null, { error: 'error' })

  await counter(2, { ms })
    [Debounce](ms / 2)
    [SubscribeAndAssert]([0], { asyncTerminate: true })

  // complete while debounce has an emission pending and then have
  // the observer synchronously cancel the observable during the 
  // handling of that pending emission which should suppress the complete
  await counter(1, { ms })
    [Debounce](ms * 2)
    [SubscribeAndAssert]([0], { terminate: true })
})