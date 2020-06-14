var { assert,
  '@kingjs': {
    '-rx': {
      SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-sync': { Tap, Finalize, SubscribeAndAssert, Do, Where,
        '-static': { of, throws, empty },
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
    o[AsyncSubscribeAndAssert]([0, 1], { abandon: true })
  )
  [SubscribeAndAssert]([0, 1], { terminate: true })

// tap cancels source, prevents next
var cancel
of(0, 1, 2)
  [Tap](o => o
    [Where](o => o == 1)
    [Do](() => { cancel() })
    [AsyncSubscribeAndAssert]([1], { abandon: true })
  )
  [SubscribeAndAssert]([0], { abandon: o => cancel = o })

// tap cancels source, prevents error
var cancel = () => null
throws('error')
  [Tap](o => o
    [Finalize](() => cancel())
    [AsyncSubscribeAndAssert](null, { error: 'error' })
  )
  [SubscribeAndAssert](null, { abandon: o => cancel = o })

// tap cancels source, prevents complete
var cancel
empty()
  [Tap](o => o
    [Finalize](() => cancel())
    [AsyncSubscribeAndAssert]()
  )
  [SubscribeAndAssert](null, { abandon: o => cancel = o })