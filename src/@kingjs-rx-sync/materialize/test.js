var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    IObservable: { Subscribe },
    '-rx': {
      '-sync': { GroupBy, Log, Regroup, SubscribeAndAssert, SelectMany, Materialize,
        '-static': { of, throws, never }
      }, 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var grouping = { grouping: true }
var next = { next: true }
var complete = { complete: true }
var error = { error: true }

of(0, 1, 2)
  [Materialize]()
  [SubscribeAndAssert]([
    { ...next, value: 0 },
    { ...next, value: 1 },
    { ...next, value: 2 },
    complete
  ])

of('a0', 'a1', 'b0')
  [GroupBy](o => o[0])
  [Materialize]()
  [SubscribeAndAssert]([
    { ...grouping, keys: [ 'a' ] },
    { ...next, value: 'a0', keys: [ 'a' ] },
    { ...next, value: 'a1', keys: [ 'a' ] },
    { ...grouping, keys: [ 'b' ] },
    { ...next, value: 'b0', keys: [ 'b' ] },
    { ...complete, keys: [ 'a' ] },
    { ...complete, keys: [ 'b' ] },
    { ...complete }
  ])

of('a!0', 'b!0', 'a!1', 'a?0')
  [GroupBy](o => o[0])
  [Regroup](o => o
    [GroupBy](x => x[1])
  )
  [Materialize]()
  [SubscribeAndAssert]([
    { ...grouping, keys: [ 'a' ] },
    { ...grouping, keys: [ 'a', '!' ] },
    { ...next, value: 'a!0', keys: [ 'a', '!' ] },
    { ...grouping, keys: [ 'b' ] },
    { ...grouping, keys: [ 'b', '!' ] },
    { ...next, value: 'b!0', keys: [ 'b', '!' ] },
    { ...next, value: 'a!1', keys: [ 'a', '!' ] },
    { ...grouping, keys: [ 'a', '?' ] },
    { ...next, value: 'a?0', keys: [ 'a', '?' ] },
    { ...complete, keys: [ 'a', '!' ] },
    { ...complete, keys: [ 'a', '?' ] },
    { ...complete, keys: [ 'a' ] },
    { ...complete, keys: [ 'b', '!' ] },
    { ...complete, keys: [ 'b' ] },
    { ...complete },
  ])

throws('error')
  [Materialize]()
  [SubscribeAndAssert]([
    { ...error, value: 'error' }
  ])

never()
  [Materialize]()
  [SubscribeAndAssert](null, { terminate: true })