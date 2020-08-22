var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete, Error },
    IGroupedObservable: { Key },
    '-rx': { SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-sync': { SubscribeAndAssert, Select, Do, GroupBy, Regroup, Then,
        '-static': { of, throws, never }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()
  
// basic grouping selection
var groups = [['a0!', 'a2!'], ['b1!']]
of('a0', 'b1', 'a2')
  [GroupBy](o => o[0])
  [Regroup](o => o[Select](x => x + '!'))
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'b'])
assert.ok(!groups.length)

// basic grouping by key
var groups = [['a0', 'a2'], ['b1']]
of('a0', 'b1', 'a2')
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'b'])
assert.ok(!groups.length)

// complete and restart a group
var groups = [['a0'], ['a1']]
of('a0', 'a', 'a1')
  [GroupBy](o => o[0], o => !o[1])
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'a'])
assert.ok(!groups.length)

// create and complete a group in one message
var groups = [['a0']]
of('a0')
  [GroupBy](o => o[0], o => true)
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'])
assert.ok(!groups.length)

// basic error propagation
throws('error')
  [GroupBy]()
  [SubscribeAndAssert](null, { error: 'error' })

// error propagation through to groups
of('a0')
  [Then](throws('error'))
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { error: 'error' }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { error: 'error' })

// basic cancel propagation
never()
  [GroupBy]()
  [SubscribeAndAssert](null, { terminate: true })

// cancel propagation through to groups
of('a0', 'a0')
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](['a0'], { terminate: true }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'a'])

// group cancels source on complete
var cancel
of('a0')
  [GroupBy](o => o[0])
  [Do](o => o[Subscribe]({ [Complete]: () => cancel() }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { abandon: o => cancel = o })
cancel = undefined

// group cancels source on error
var cancel
of('a0')
  [Then](throws('error'))
  [GroupBy](o => o[0])
  [Do](o => o[Subscribe]({ [Error]: () => cancel() }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { abandon: o => cancel = o })
cancel = undefined

// cancel propagation through to groups
of('a0')
  [Then](never())
  [GroupBy](o => o[0])
  [Do](o => o[AsyncSubscribeAndAssert](null, { abandon: true }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a'], { terminate: true })

// call cancel for a closed group does not affect new groups
// even if they both share the same key 
var cancel
of('a0', 'a', 'a1', 'a2')
  [GroupBy](o => o[0], o => !o[1])
  [Do](o => o[Subscribe]({ 
    [Subscribed](o) { 
      if (!cancel) 
        // save cancel for 'a0' group
        cancel = o

      else 
        // given 'a1', cancel 'a0' again after 'a0' canceled by 'a' 
        // and expect 'a2' is emitted in same group as 'a1'
        cancel() 
    }
  }))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'a'])
cancel = undefined