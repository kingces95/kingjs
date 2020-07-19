var {
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    '-rx': {
      '-sync': { DistinctUntilChanged, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

Number.prototype[Equals] = function(o) { return o == this }
Number.prototype[GetHashcode] = () => 0

of(0, 0, 1, 2, 2, 1)
  [DistinctUntilChanged]()
  [SubscribeAndAssert]([0, 1, 2, 1])

throws('error')
  [DistinctUntilChanged]()
  [SubscribeAndAssert](null, { error:'error' })

never()
  [DistinctUntilChanged]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 0, 1, 2, 2, 1)
  [DistinctUntilChanged]()
  [SubscribeAndAssert]([0, 1, 2], { terminate: true })