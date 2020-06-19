var {
  '@kingjs': {
    IObservable: { Subscribe },
    IEquatable: { Equals, GetHashcode },
    '-string': { GetHashcode: GetStringHashcode },
    '-rx': { 
      '-sync': { SelectManyGroups, Materialize, SubscribeAndAssert,
        '-static': { of, throws, never },
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

class Key {
  constructor(name, type) {
    this.name = name
    this.type = type
  }
  [Equals](o) { 
    return o.name == this.name && 
      o.type == this.type 
  }
  [GetHashcode]() { 
    return this.name[GetStringHashcode]() ^ 
      this.type[GetStringHashcode]() 
  }
}

// test composite key
of([new Key('n', 't')], [new Key('n', 't')])
  [SelectManyGroups](Identity, Identity, (l, r) => l.name < r.name)
  [Materialize]()
  [SubscribeAndAssert]([
    { grouping: true, keys: [{ name: 'n', type: 't' }] },
    {
      next: true,
      value: { name: 'n', type: 't' },
      keys: [{ name: 'n', type: 't' }]
    },
    {
      next: true,
      value: { name: 'n', type: 't' },
      keys: [{ name: 'n', type: 't' }]
    },
    { complete: true, keys: [ { name: 'n', type: 't' } ] },
    { complete: true }
  ])

// basic array mutations
of([0, 1], [0, 2], [2])
  [SelectManyGroups]()
  [Materialize]()
  [SubscribeAndAssert]([
    { grouping: true, keys: [ 0 ] },
    { next: true, value: 0, keys: [ 0 ] },
    { grouping: true, keys: [ 1 ] },
    { next: true, value: 1, keys: [ 1 ] },
    { next: true, value: 0, keys: [ 0 ] },
    { complete: true, keys: [ 1 ] },
    { grouping: true, keys: [ 2 ] },
    { next: true, value: 2, keys: [ 2 ] },
    { complete: true, keys: [ 0 ] },
    { next: true, value: 2, keys: [ 2 ] },
    { complete: true, keys: [ 2 ] },
    { complete: true }
  ])

never()
  [SelectManyGroups]()
  [SubscribeAndAssert](null, { terminate: true })

throws('error')
  [SelectManyGroups]()
  [SubscribeAndAssert](null, { error: 'error' })

of([0])
  [SelectManyGroups]()
  [Materialize]()
  [SubscribeAndAssert]([
    { grouping: true, keys: [ 0 ] },
  ], { terminate: true })