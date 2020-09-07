var { assert,
  '@kingjs': {
    Comparer,
    ISingleton: { IsSingleton },
    IComparable: { IsLessThan },
    IEquatable: { Equals, GetHashcode },
    '-string': { GetHashcode: GetStringHashcode },
    '-rx': { 
      '-sync': { WatchSet, Materialize, SubscribeAndAssert,
        '-static': { of, throws, never },
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

// group sets expressed as ordered integer arrays 
// where the integer element is the group key
of([0, 1], [0, 2], [2])
  [WatchSet]()
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
  [WatchSet]()
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
    this.id = key
  }

  [IsSingleton]() { return true }
}
class SVal {
  constructor(key) {
    this.key = new SKey(key)
  } 
}

var v0 = new SVal(0)
var v1 = new SVal(1)
var v2 = new SVal(2)

var k0 = v0.key
var k1 = v1.key
var k2 = v2.key

of(
  [v0, v1], 
  [v0, v2], 
  [v2]
)
// custom key selector and comparer
[WatchSet]({
  keySelector: o => o.key, 
  keyComparer: new Comparer((l, r) => l.id < r.id)
})
[Materialize]()
[SubscribeAndAssert]([
  { grouping: true, keys: [ k0 ] },
  { next: true, value: v0, keys: [ k0 ] },
  { grouping: true, keys: [ k1 ] },
  { next: true, value: v1, keys: [ k1 ] },

  { next: true, value: v0, keys: [ k0 ] },
  { complete: true, keys: [ k1 ] },
  { grouping: true, keys: [ k2 ] },
  { next: true, value: v2, keys: [ k2 ] },

  { complete: true, keys: [ k0 ] },
  { next: true, value: v2, keys: [ k2 ] },

  { complete: true, keys: [ k2 ] },
  { complete: true }
])

never()
  [WatchSet]()
  [SubscribeAndAssert](null, { terminate: true })

throws('error')
  [WatchSet]()
  [SubscribeAndAssert](null, { error: 'error' })

of([0])
  [WatchSet]()
  [Materialize]()
  [SubscribeAndAssert]([
    { grouping: true, keys: [ 0 ] },
  ], { terminate: true })