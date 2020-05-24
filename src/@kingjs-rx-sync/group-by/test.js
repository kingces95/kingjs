var {
  '@kingjs': {
    IGroupedObservable: { Key },
    '-rx': { SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-static': { never },
      '-sync': { SubscribeAndAssert, Select, Do, GroupBy, Then,
        '-static': { of, throws }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  // basic grouping by key
  var groups = [['a0', 'a2'], ['b1']]
  await of('a0', 'b1', 'a2')
    [GroupBy](o => o[0])
    [Do](o => o[AsyncSubscribeAndAssert](groups.shift()).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a', 'b'])

  // complete and restart a group
  var groups = [['a0'], ['a1']]
  await of('a0', 'a', 'a1')
    [GroupBy](o => o[0], o => !o[1])
    [Do](o => o[AsyncSubscribeAndAssert](groups.shift()).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a', 'a'])

  // basic error propagation
  await throws('error')
    [GroupBy]()
    [SubscribeAndAssert](null, { error: 'error' })

  // error propagation through to groups
  await of('a0')
    [Then](throws('error'))
    [GroupBy](o => o[0])
    [Do](o => o[AsyncSubscribeAndAssert](['a0'], { error: 'error' }).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a'], { error: 'error' })

  // basic cancel propagation
  var cancel = await never()
    [GroupBy]()
    [SubscribeAndAssert](['a'], { unfinished: true })
  cancel()

  // cancel propagation through to groups
  var cancel = await of('a0')
    [Then](never())
    [GroupBy](o => o[0])
    [Do](o => o[AsyncSubscribeAndAssert](['a0'], { unfinished: true }).then())
    [Select](o => o[Key])
    [SubscribeAndAssert](['a'], { unfinished: true })
  cancel()
})