var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert,
      '-static': { clock, create },
      '-async': { Zip }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await clock()
    [Zip](function*() { yield 'a' })
    [SubscribeAndAssert]([{ key: 0, value: 'a' }])

  await clock()
    [Zip](function*() { yield 'a'; return 'error' })
    [SubscribeAndAssert]([{ key: 0, value: 'a' }], { error: 'error' })

  var cancel = await clock()
    [Zip](function*() { yield 'a'; yield 'b' }, (k, v) => ({ k, v }))
    [SubscribeAndAssert]([{ k: 0, v: 'a' }], { unfinished: true })
  cancel()

  clock(0, 1)
    [Zip]()
    [SubscribeAndAssert]([])

  await clock()
    [Zip](function*() { return 'error' })
    [SubscribeAndAssert](null, { error: 'error' })

  create(function*() { throws('error') })
    [Zip]()
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await clock()
    [Zip](function*() { yield 'a' })
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})