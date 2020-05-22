var { assert,
  '@kingjs': {
    '-rx': { SelectMany, SubscribeAndAssert, 
      '-static': { of, throws, never }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await of(0, 1, 2)
    [SelectMany](
      outer => of(outer + 1), 
      (inner, outer) => {
        assert.equal(inner, outer + 1)
        return inner
      })
    [SubscribeAndAssert]([1, 2, 3])

  await of(of(0), of(1), of(2))
    [SelectMany]()
    [SubscribeAndAssert]([0, 1, 2])

  await of()
    [SelectMany]()
    [SubscribeAndAssert]()

  await of(of())
    [SelectMany]()
    [SubscribeAndAssert]()

  await throws('error')
    [SelectMany]()
    [SubscribeAndAssert](null, { error: 'error' })

  await of(throws('error'))
    [SelectMany]()
    [SubscribeAndAssert](null, { error: 'error' })

  await of(of(0), throws('error'))
    [SelectMany]()
    [SubscribeAndAssert]([0], { error: 'error' })

  await of(of(0, 1), throws('error'), of(2))
    [SelectMany]()
    [SubscribeAndAssert]([0], { error: 'error' })

  var cancel = await of(of(0), never())
    [SelectMany]()
    [SubscribeAndAssert]([0], { unfinished: true })
  cancel()
})