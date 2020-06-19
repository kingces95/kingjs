var {
  '@kingjs': {
    '-rx': {
      '-sync': { RollingZipJoin, Select, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var selector = o => ({ 
  current: o.outer, 
  previous: o.inner, 
  key: o.key 
})

of([0], [0], [])
  [RollingZipJoin]()
  [Select](selector)
  [SubscribeAndAssert]([
    { current: 0, previous: null, key: 0},
    { current: 0, previous: 0, key: 0 },
    { current: null, previous: 0, key: 0 },
  ])

of([0, 1], [1], [])
  [RollingZipJoin]()
  [Select](selector)
  [SubscribeAndAssert]([
    { current: 0, previous: null, key: 0},
    { current: 1, previous: null, key: 1},
    { current: null, previous: 0, key: 0 },
    { current: 1, previous: 1, key: 1 },
    { current: null, previous: 1, key: 1 },
  ])

of([{ key:1 }, { key:0 }], [{ key: 0 }])
  [RollingZipJoin](
    o => o.key, 
    (l, r) => l > r
  )
  [Select](selector)
  [SubscribeAndAssert]([
    { current: { key:1 }, previous: null, key: 1 },
    { current: { key:0 }, previous: null, key: 0 },
    { current: null, previous: { key:1 }, key: 1 },
    { current: { key:0 }, previous: { key:0 }, key: 0 },
  ])

throws('error')
  [RollingZipJoin]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [RollingZipJoin]()
  [SubscribeAndAssert](null, { terminate: true })

of([0, 1], [0], [])
  [RollingZipJoin]()
  [Select](selector)
  [SubscribeAndAssert]([
    { current: 0, previous: null, key: 0},
  ], { terminate: true })