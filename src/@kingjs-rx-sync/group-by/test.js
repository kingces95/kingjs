var { assert,
  '@kingjs': {
    EqualityComparer,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Complete, Error },
    IGroupedObservable: { Key },
    '-rx': { GroupBy: GroupByAsync, SubscribeAndAssert: AsyncSubscribeAndAssert,
      '-subject': { CollectibleSubject },
      '-static': { of: asyncOf },
      '-sync': { SubscribeAndAssert, Select, Do, Regroup, Then, GroupBy, Where,
        '-static': { of, throws, never }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()
  
// basic grouping selection
// var groups = [['a0!', 'a2!'], ['b1!']]
// of('a0', 'b1', 'a2')
//   [GroupBy](o => o[0])
//   [Regroup](o => o[Select](x => x + '!'))
//   [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
//   [Select](o => o[Key])
//   [SubscribeAndAssert](['a', 'b'])
// assert.ok(!groups.length)

// basic grouping selection
var a0 = { key: 'a', value: 0 }
var a2 = { key: 'a', value: 2 }
var b1 = { key: 'b', value: 1 }
var options = { 
  keyEqualityComparer: new EqualityComparer((l, r) => l.key == r.key) 
}
var groups = [[a0, a2], [b1]]
of(a0, b1, a2)
  [GroupBy](o => o, options)
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert]([a0, b1])
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
var createSubject = cancel => new CollectibleSubject(cancel, o => o.length == 1)
var groups = [['a0'], ['a1']]
of('a0', 'a', 'a1', 'a')
  [GroupBy](o => o[0], { createSubject })
  [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
  [Select](o => o[Key])
  [SubscribeAndAssert](['a', 'a'])
assert.ok(!groups.length)

// create and complete a group in one message
of('a')
  [GroupBy](o => o[0], { createSubject })
  [Do](o => o[AsyncSubscribeAndAssert](null))
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
of('a0', 'a', 'a1', 'a2', 'a')
  [GroupBy](o => o[0], { createSubject })
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

process.nextTick(async () => {

  var createSubject = o => new CollectibleSubject(o, {
    isAddRef: o => o[2] == '+',
    isRelease: o => o[2] == '-',
  })

  // use control messages to create and close the same group twice
  var groups = [['xa0'], ['xb0']]
  await asyncOf('xa+', 'xa0', 'xa-', 'xb+', 'xb0', 'xb-')
    [GroupByAsync](o => o[0], { createSubject })
    [Do](o => o[AsyncSubscribeAndAssert](groups.shift()))
    [Select](o => o[Key])
    [AsyncSubscribeAndAssert](['x', 'x'])

  // use control messages to create and close a group and debounce to resurrect it
  var debounce = 50
  await asyncOf('xa+', 'xa0', 'xa-', 'xb+', 'xb0', 'xb-')
    [GroupByAsync](o => o[0], { createSubject, debounce })
    [Do](o => o[AsyncSubscribeAndAssert](['xa0', 'xb0']))
    [Select](o => o[Key])
    [AsyncSubscribeAndAssert](['x'])
})