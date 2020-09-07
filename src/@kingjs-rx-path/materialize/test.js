var { assert,
  '@kingjs': {
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert: SubscribeAndAssertAsync,
      '-path': { Watch, Materialize },
      '-subject': { Subject },
      '-sync': { Then, Do, SubscribeAndAssert,
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

  class Node {
    constructor(path) { this.path = path }
  }
  class Leaf extends Node {
    constructor(path, id, v) {
      super(path)
      this.id = id
      this.v = v
    }
  }

  var a = new Node('a')
  var b = new Node('ab')
  var x0 = new Leaf('a.x', 'x', 0)
  var x1 = new Leaf('a.x', 'x', 1)
  var y0 = new Leaf('ab.y', 'y', 0)
  var z0 = new Leaf('ab.z', 'z', 0)
  var Z0 = new Leaf('a.z', 'z', 0)

  var watchers = {
    ['a']: new Subject(),
    ['ab']: new Subject(),
  }

  var children = {
    ['a']: [ x0, b ],
    ['ab']: [ y0 ],
  }

  var subject = new Subject()

  var result = []

  await subject
    [Watch](a, {
      isLeaf: o => o instanceof Leaf,
      selectWatcher: o => watchers[o.path],
      selectChildren: o => [...children[o.path]],
      selectPath: o => o.path,
      selectIdentity: o => o.id,
      selectVersion: o => o.v,
      debounce: 20,
    })
    [Materialize]()
    [Do](o => result.push(o))
    [SubscribeAndAssertAsync]([
      () => subject[Next](),
      { found: true, id: 'x', path: 'a.x', value: x0 },
      { found: true, id: 'y', path: 'ab.y', value: y0 },
  
      () => subject[Next](),
  
      () => watchers['a'][Next](),
  
      () => {
        children['a'][0] = x1,
        watchers['a'][Next]()
      },
      { change: true, id: 'x', path: 'a.x', value: x1 } ,
  
      () => {
        // create z
        children['ab'].push(z0)
        watchers['ab'][Next]()
      },
      { found: true, id: 'z', path: 'ab.z', value: z0 },
  
      () => {
        // delete z
        children['ab'].pop()
        watchers['ab'][Next]()
      },
      () => sleep(100),
      { lost: true, id: 'z', path: 'ab.z' },
  
      () => {
        // create z
        children['ab'].push(z0)
        watchers['ab'][Next]()
      },
      { found: true, id: 'z', path: 'ab.z', value: z0 },
  
      () => {
        // rename ab.z -> a.z
        children['ab'].pop()
        watchers['ab'][Next]()
  
        children['a'].push(Z0)
        watchers['a'][Next]()
      },
      { move: true, id: 'z', path: 'a.z', previousPath: 'ab.z', value: Z0 },
  
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
    ], { log: false })

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