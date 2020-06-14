var {
  '@kingjs': {
    IGroupedObservable: { Subscribe, Key },
    IObserver: { Complete, Error },
    '-rx': { SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-sync': { SubscribeAndAssert, Select, Do, WindowBy, Then,
        '-static': { of, throws, never, empty }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

// basic grouping by key
var windows = [['a0', 'a1'], ['b2'], ['a3']]
of('a0', 'a1', 'b2', 'a3')
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](windows.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'b', 'a'])

// no window created in the first place
empty()
  [WindowBy]()
  [SubscribeAndAssert]()

// basic error propagation
throws('error')
  [WindowBy]()
  [SubscribeAndAssert](null, { error: 'error' })

// error propagation through to windows
of('a0')
  [Then](throws('error'))
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { error: 'error' }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { error: 'error' })

// self cancelling window subscription
var windows = [['a0'], ['a1']]
of('a0', 'a1')
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](windows.shift(), { terminate: true }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'a'])

// basic cancel propagation
never()
  [WindowBy]()
  [SubscribeAndAssert](null, { terminate: true })

// cancel propagation through to windows
of('a0')
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](null, { abandon: true }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { terminate: true })

// window cancels source on complete
var cancel
of('a0')
  [WindowBy](o => o[0])
  [Do](o => o[Subscribe]({ [Complete]: () => cancel() }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { abandon: o => cancel = o })
cancel = undefined

// window cancels source on error
var cancel
of('a0')
  [Then](throws('error'))
  [WindowBy](o => o[0])
  [Do](o => o[Subscribe]({ [Error]: () => cancel() }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { abandon: o => cancel = o })
cancel = undefined

// window complete cancels source on creating of new window
var cancel
of('a0', 'b0')
  [WindowBy](o => o[0])
  [Do](o => o[Subscribe]({ [Complete]: () => cancel() }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { abandon: o => cancel = o })
cancel = undefined