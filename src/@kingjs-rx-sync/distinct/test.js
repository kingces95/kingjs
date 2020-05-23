var {
  '@kingjs': {
    '-rx': {
      '-static': { never },
      '-sync': { Distinct, SubscribeAndAssert,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1, 2, 0, 1, 2)
    [Distinct]()
    [SubscribeAndAssert]([0, 1, 2])

  throws('error')
    [Distinct]()
    [SubscribeAndAssert](null, { error:'error' })

  var cancel = await never()
    [Distinct]()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})