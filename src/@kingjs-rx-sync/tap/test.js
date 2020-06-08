var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Initialize },
    '-rx': {
      SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-sync': { Tap, Finalize, SubscribeAndAssert, Do, CatchAndThen, Where,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Tap](o => o[AsyncSubscribeAndAssert]([0, 1, 2]))
  [SubscribeAndAssert]([0, 1, 2])

throws('error')
  [Tap](o => o[AsyncSubscribeAndAssert](null, { error: 'error' }))
  [SubscribeAndAssert](null, { error: 'error' })

of(0, 1, 2)
  [Tap](o => 
    o[AsyncSubscribeAndAssert]([0], { terminate: true })
  )
  [SubscribeAndAssert]([0, 1], { terminate: true })

of(0, 1, 2)
  [Tap](o =>
    // `Complete` is never observed because the tapped IObservable is canceled
    o[Finalize](assert.fail)
  )
  [SubscribeAndAssert]([0, 1], { terminate: true })

// tap cancels source, prevents next
var cancel
of(0, 1, 2)
  [Tap](o => o
    [Where](o => o == 1)
    [Do](() => cancel())
    [Subscribe]()
  )
  [Do]({ [Initialize](o) { cancel = o } })
  [SubscribeAndAssert]([0], { abandon: true })

// tap cancels source, prevents complete
var cancel
of(0, 1, 2)
  [Tap](o => o
    [Finalize](() => cancel())
    [Subscribe]()
  )
  [Do]({ [Initialize](o) { cancel = o } })
  [SubscribeAndAssert]([0, 1, 2], { abandon: true })

// tap cancels source, prevents error
var cancel = () => null
throws('error')
  [Tap](o => o
    [Finalize](() => cancel())
    [CatchAndThen]()
    [Subscribe]()
  )
  [Do]({ [Initialize](o) { cancel = o } })
  [SubscribeAndAssert](null, { abandon: true })
