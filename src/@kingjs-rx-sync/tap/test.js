var {
  '@kingjs': {
    '-rx': {
      SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-static': { never },
      '-sync': { Tap, Then, SubscribeAndAssert,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1, 2)
    [Tap](o => o[AsyncSubscribeAndAssert]([0, 1, 2]))
    [SubscribeAndAssert]([0, 1, 2])

  throws('error')
    [Tap](o => o[AsyncSubscribeAndAssert](null, { error: 'error' }))
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await of()
    [Tap](o =>
      // `Complete` is never observed because the tapped IObservable is canceled
      o[Then](never())
    )
    [Then](never())
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})
