var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Error },
    IGroupedObservable: { Key },
    '-promise': { sleep },
    '-rx': {
      '-path': { Materialize },
      '-sync': { SubscribeAndAssert, SubscribeAndLog, Then,
        '-static': { of, from, throws, empty },
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

function group(key, items, error) {
  var result = from(items)

  if (error)
    result = result[Then](throws(error))

  result[Key] = key
  return result
}

of(
  group(42, [
    group('a.b.c', [{ v: 1 }, { v: 2 }]),
    group('x.y.z', [{ v: 2 }])
  ]))
  [Materialize]()
  [SubscribeAndAssert]([
    { found: true, id: 42, path: 'a.b.c', value: { v: 1 } },
    { change: true, id: 42, path: 'a.b.c', value: { v: 2 } },
    {
      move: true,
      id: 42,
      path: 'x.y.z',
      previousPath: 'a.b.c',
      value: { v: 2 }
    },
    { lost: true, id: 42, path: 'x.y.z' },
    { complete: true },
  ])

empty()
  [Materialize]()
  [SubscribeAndAssert]([
    { complete: true }
  ], { terminate: true })

throws('error')
  [Materialize]()
  [SubscribeAndAssert]([
    { error: true, value: 'error' }
  ])

throws('error')
  [Materialize]()
  [SubscribeAndAssert]([
    { error: true, value: 'error' }
  ], { terminate: true })
  
of(
  group(42, [group('a.b.c', [{ v: 1 }])], 'error'))
  [Materialize]()
  [SubscribeAndAssert]([
    { found: true, id: 42, path: 'a.b.c', value: { v: 1 } },
    { error: true, id: 42, value: 'error' }
  ])
  
of(
  group(42, [
    group('a.b.c', [{ v: 1 }], 'error'),
    group('x.y.z', [{ v: 1 }])
  ]))
  [Materialize]()
  [SubscribeAndAssert]([
    { found: true, id: 42, path: 'a.b.c', value: { v: 1 } },
    { error: true, id: 42, path: 'a.b.c', value: 'error' }
  ])