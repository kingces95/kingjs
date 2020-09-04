var { assert,
  '@kingjs': {
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-promise': { sleep },
    '-rx': {
      '-path': { Watch, Materialize },
      '-subject': { Subject },
      '-sync': { SubscribeAndAssert, Then, Do,
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
  ])

empty()
  [Materialize]()
  [SubscribeAndAssert]()

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

process.nextTick(async () => {
  var subject = new Subject()

  var watchers = {
    ['a']: new Subject(),
    ['ab']: new Subject(),
  }
  
  var children = {
    ['a']: [ 'a.x', 'ab' ],
    ['ab']: [ 'ab.y' ],
  }
  
  var entity = {
    ['a.x']: 'x0',
    ['ab.y']: 'y0',
    ['ab.z']: 'z0',
    ['a.z']: 'z0',
  }
  
  var result = []

  await subject
    [Watch]('a', {
      isLeaf: path => !watchers[path],
      selectWatcher: path => watchers[path],
      selectChildren: path => [...children[path]],
      selectEntity: path => entity[path],
      selectIdentity: entity => entity[0],
      selectVersion: entity => entity[1],
      debounce: 20,
    })
    [Materialize]()
    [Do](o => result.push(o))
    [SubscribeAndAssert]([
      () => subject[Next](),
      { found: true, id: 'x', path: 'a.x', value: 'x0' },
      { found: true, id: 'y', path: 'ab.y', value: 'y0' },
  
      () => subject[Next](),
  
      () => watchers['a'][Next](),
  
      () => {
        entity['a.x'] = 'x1',
        watchers['a'][Next]()
      },
      { change: true, id: 'x', path: 'a.x', value: 'x1' } ,
  
      () => {
        // create z
        children['ab'].push('ab.z')
        watchers['ab'][Next]()
      },
      { found: true, id: 'z', path: 'ab.z', value: 'z0' },
  
      () => {
        // delete z
        children['ab'].pop()
        watchers['ab'][Next]()
      },
      () => sleep(100),
      { lost: true, id: 'z', path: 'ab.z' },
  
      () => {
        // create z
        children['ab'].push('ab.z')
        watchers['ab'][Next]()
      },
      { found: true, id: 'z', path: 'ab.z', value: 'z0' },
  
      () => {
        // rename ab.z -> a.z
        children['ab'].pop()
        watchers['ab'][Next]()
  
        children['a'].push('a.z')
        watchers['a'][Next]()
      },
      { move: true, id: 'z', path: 'a.z', previousPath: 'ab.z', value: 'z0' },
  
      () => {
        children['a'].pop()
        children['a'].pop()
        watchers['a'][Next]()
      },
      () => sleep(100),
      { lost: true, id: 'y', path: 'ab.y' },
      { lost: true, id: 'z', path: 'a.z' },
  
      () => subject[Complete](),
      { lost: true, id: 'x', path: 'a.x' }, 
    ], { 
      async: true
    })

    result = result.map(o => o.toString())
    assert.deepEqual(result, [
      '+ a.x',
      '+ ab.y',
      'Δ a.x',
      '+ ab.z',
      '- ab.z',
      '+ ab.z',
      '↺ ab.z -> a.z',
      '- ab.y',
      '- a.z',
      '- a.x'
    ])
})