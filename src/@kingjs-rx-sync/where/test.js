var {
  '@kingjs': {
    '-rx': { 
      '-static': { never },
      '-sync': { Where, SubscribeAndAssert, 
        '-static': { of, throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1)
    [Where](o => o == 1)
    [SubscribeAndAssert]([1])

  of(0, 1)
    [Where]()
    [SubscribeAndAssert]([0, 1])

  throws('error')
    [Where]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await never()
    [Where]()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})