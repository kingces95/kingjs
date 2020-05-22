var {
  '@kingjs': {
    '-rx': { Blend, SubscribeAndAssert,
      '-static': { never, of, throws },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await of(0)
    [Blend](of(1), of(2))
    [SubscribeAndAssert]([0, 1, 2])

  await of()
    [Blend]()
    [SubscribeAndAssert]()

  await throws('error')
    [Blend](of(0))
    [SubscribeAndAssert](null, { error: 'error' })

  await of(0)
    [Blend](of(1), throws('error'), throws('another error'))
    [SubscribeAndAssert]([0, 1], { error: 'error' })

  var cancel = await of(0)
    [Blend](of(1), never())
    [SubscribeAndAssert]([0, 1], { unfinished: true })
  cancel()
})