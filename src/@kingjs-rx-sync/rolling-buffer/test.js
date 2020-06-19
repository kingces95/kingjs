var {
  '@kingjs': {
    '-rx': {
      '-sync': { RollingBuffer, Select, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [RollingBuffer]()
  [SubscribeAndAssert]([[0], [1,0], [2,1], [3,2], [4,3]])

of(0, 1, 2, 3, 4)
  [RollingBuffer](3)
  [Select](o => o.join())
  [SubscribeAndAssert](['0', '1,0', '2,1,0', '3,2,1', '4,3,2'])

throws('error')
  [RollingBuffer]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [RollingBuffer]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 1, 2, 3, 4)
  [RollingBuffer]()
  [SubscribeAndAssert]([[0], [1,0]], { terminate: true })