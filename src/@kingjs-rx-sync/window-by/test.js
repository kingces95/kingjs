var {
  '@kingjs': {
    IObservable: { Subscribe },
    IGroupedObservable: { Key },
    '-rx': { SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-static': { never },
      '-sync': { SubscribeAndAssert, Select, Do, WindowBy, Then,
        '-static': { of, throws }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  // basic grouping by key
  var windows = [['a0', 'a1'], ['b2'], ['a3']]
  await of('a0', 'a1', 'b2', 'a3')
    [WindowBy](o => o[0])
    [Do](o => o[AsyncSubscribeAndAssert](windows.shift()).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a', 'b', 'a'])

  // basic error propagation
  await throws('error')
    [WindowBy]()
    [SubscribeAndAssert](null, { error: 'error' })

  // error propagation through to groups
  await of('a0')
    [Then](throws('error'))
    [WindowBy](o => o[0])
    [Do](o => o[AsyncSubscribeAndAssert](['a0'], { error: 'error' }).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a'], { error: 'error' })

  // basic cancel propagation
  var cancel = await never()
    [WindowBy]()
    [SubscribeAndAssert](['a'], { unfinished: true })
  cancel()

  // cancel propagation through to groups
  var cancel = await of('a0')
    [Then](never())
    [WindowBy](o => o[0])
    [Do](o => o[AsyncSubscribeAndAssert](['a0'], { unfinished: true }).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a'], { unfinished: true })
  cancel()
})