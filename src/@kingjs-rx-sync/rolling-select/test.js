var {
  '@kingjs': {
    '-rx': {
      '-static': { never },
      '-sync': { RollingSelect, Then, SubscribeAndAssert,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1, 2, 3, 4)
    [RollingSelect]()
    [SubscribeAndAssert]([[0], [1], [2], [3], [4]])

  of(0, 1, 2, 3, 4)
    [RollingSelect](o => o.join(), 2)
    [SubscribeAndAssert](['0', '1,0', '2,1', '3,2', '4,3'])

  throws('error')
    [RollingSelect]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await of()
    [RollingSelect]()
    [Then](never())
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})
