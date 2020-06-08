var {
  '@kingjs': {
    '-rx': {
      '-sync': { RollingSelect, Then, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2, 3, 4)
  [RollingSelect]()
  [SubscribeAndAssert]([[0], [1,0], [2,1], [3,2], [4,3]])

of(0, 1, 2, 3, 4)
  [RollingSelect](o => o.join(), 3)
  [SubscribeAndAssert](['0', '1,0', '2,1,0', '3,2,1', '4,3,2'])

throws('error')
  [RollingSelect]()
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [RollingSelect]()
  [SubscribeAndAssert](null, { terminate: true })

of(0, 1, 2, 3, 4)
  [RollingSelect]()
  [SubscribeAndAssert]([[0], [1,0]], { terminate: true })

