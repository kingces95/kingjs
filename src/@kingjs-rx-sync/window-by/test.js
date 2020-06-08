var {
  '@kingjs': {
    IGroupedObservable: { Key },
    '-rx': { SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-sync': { SubscribeAndAssert, Select, Do, WindowBy, Then,
        '-static': { of, throws, never }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

// basic grouping by key
var windows = [['a0', 'a1'], ['b2'], ['a3']]
of('a0', 'a1', 'b2', 'a3')
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](windows.shift()).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'b', 'a'])

// basic error propagation
throws('error')
  [WindowBy]()
  [SubscribeAndAssert](null, { error: 'error' })

// error propagation through to windows
of('a0')
  [Then](throws('error'))
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { error: 'error' }).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { error: 'error' })

// self cancelling window subscription
of('a0')
  [WindowBy](o => o[0])
  [Do](o => o[SubscribeAndAssert](null, { abort: true }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'])

// basic cancel propagation
never()
  [WindowBy]()
  [SubscribeAndAssert](null, { abort: true })

// cancel propagation through to windows
of('a0', 'a1')
  [WindowBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { terminate: true }).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { terminate: true })