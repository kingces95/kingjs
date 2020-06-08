var { assert,
  '@kingjs': {
    IGroupedObservable: { Key },
    '-rx': { SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-sync': { SubscribeAndAssert, Select, Do, GroupBy, Regroup, Then,
        '-static': { of, throws, never }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

// basic grouping by key
var groups = [['a0', 'a2'], ['b1']]
of('a0', 'b1', 'a2')
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'b'])
assert.ok(!groups.length)

// complete and restart a group
var groups = [['a0'], ['a1']]
of('a0', 'a', 'a1')
  [GroupBy](o => o[0], o => !o[1])
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'a'])
assert.ok(!groups.length)

// basic error propagation
throws('error')
  [GroupBy]()
  [SubscribeAndAssert](null, { error: 'error' })

// error propagation through to groups
of('a0')
  [Then](throws('error'))
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { error: 'error' }).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { error: 'error' })

// basic cancel propagation
never()
  [GroupBy]()
  [SubscribeAndAssert](null, { terminate: true })

// cancel propagation through to groups
of('a0')
  [Then](never())
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { terminate: true }).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { terminate: true })

// basic grouping selection
var groups = [['a0!', 'a2!'], ['b1!']]
of('a0', 'b1', 'a2')
  [GroupBy](o => o[0])
  [Regroup](o => o[Select](x => x + '!'))
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()).then())
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'b'])
assert.ok(!groups.length)