var {
  '@kingjs': {
    '-rx': {
      '-sync': { Zip, SubscribeAndAssert,
        '-static': { throws, of }
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

of(0, 1)
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }])

of(0, 1)
  [Zip](function*() { yield 'a'; return 'error' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { error: 'error' })

of(0)
  [Zip](function*() { yield 'a'; yield 'b' }, (k, v) => ({ k, v }))
  [SubscribeAndAssert]([{ k: 0, v: 'a' }])

of(0, 1)
  [Zip]()
  [SubscribeAndAssert](null)

of(0, 1)
  [Zip](function*() { return 'error' })
  [SubscribeAndAssert](null, { error: 'error' })

throws('error')
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert](null, { error: 'error' })

of(0, 1)
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert](null, { abort: true })

of(0)
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { terminate: true })

of(0, 1)
  [Zip](function*() { yield 'a'; yield 'b' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { terminate: true })