var { assert,
  '@kingjs': {
    ISingleton: { IsSingleton },
    IComparable: { IsLessThan },
    IEquatable: { Equals, GetHashcode },
    '-string': { GetHashcode: GetStringHashcode },
    '-rx': { 
      '-sync': { GroupSetBy, Materialize, SubscribeAndAssert, Regroup, Rekey, Select,
        '-static': { of, throws, never },
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

// group sets expressed as ordered integer arrays 
// where the integer element is the group key
of([0, 1], [0, 2], [2])
  [GroupSetBy]()
  [Materialize]()
  [SubscribeAndAssert]([
    { grouping: true, keys: [ 0 ] }, // new element 0
    { next: true, value: 0, keys: [ 0 ] }, 
    { grouping: true, keys: [ 1 ] }, // new element 1
    { next: true, value: 1, keys: [ 1 ] },
    { next: true, value: 0, keys: [ 0 ] }, // element 0 remains
    { complete: true, keys: [ 1 ] }, // element 1 removed
    { grouping: true, keys: [ 2 ] }, // new element 2
    { next: true, value: 2, keys: [ 2 ] }, // element 2 remains
    { complete: true, keys: [ 0 ] }, // element 0 removed
    { next: true, value: 2, keys: [ 2 ] }, // element 2 remains
    { complete: true, keys: [ 2 ] }, // element 2 removed
    { complete: true } // set completes
  ])

class Key {
  constructor(name, type) {
    this.name = name
    this.type = type
  }
  [IsLessThan](other) {
    assert.ok(other instanceof Key)
    return this.name < other.name
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
  [GroupSetBy]()
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

class SKey {
  constructor(key) {
    this.value = key
  }

  [IsSingleton]() { return true}
}
class SVal {
  constructor(key) {
    this.key = new SKey(key)
  } 
}

var v0 = new SVal(0)
var v1 = new SVal(1)
var v2 = new SVal(2)

of(
  [v0, v1], 
  [v0, v2], 
  [v2]
)
// custom key selector and comparer
[GroupSetBy](o => o.key, (l, r) => l.value < r.value)
[Rekey](o => o.value)
[Regroup](o => o[Select](x => x.key.value))
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
  [GroupSetBy]()
  [SubscribeAndAssert](null, { terminate: true })

throws('error')
  [GroupSetBy]()
  [SubscribeAndAssert](null, { error: 'error' })

of([0])
  [GroupSetBy]()
  [Materialize]()
  [SubscribeAndAssert]([
    { grouping: true, keys: [ 0 ] },
  ], { terminate: true })