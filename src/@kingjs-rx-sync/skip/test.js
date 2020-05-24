var {
  '@kingjs': {
    '-rx': { 
      '-static': { timer },
      '-sync': { SubscribeAndAssert, Skip, Then, 
        '-static': { of, throws }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  of(0, 1, 2)
    [Skip](1)
    [SubscribeAndAssert]([1, 2])

  throws('error')
    [Skip]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await timer()
    [Then](throws('unhandled'))
    [Skip]()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})