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

of(0)
  [Zip](function*() { yield 'a'; yield 'b' }, (k, v) => ({ k, v }))
  [SubscribeAndAssert]([{ k: 0, v: 'a' }])

of(0, 1)
  [Zip]()
  [SubscribeAndAssert](null)

throws('error')
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert](null, { error: 'error' })

of(0)
  [Zip](function*() { yield 'a' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { terminate: true })

of(0, 1)
  [Zip](function*() { yield 'a'; yield 'b' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { terminate: true })

var cancel
of(0)
  [Zip](function*() { yield 'a'; cancel() })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { abandon: o => cancel = o })
cancel = undefined

of()
  [Zip](function*() { throw 'error' })
  [SubscribeAndAssert](null, { error: 'error' })

of(0)
  [Zip](function*() { yield 'a'; throw 'error' })
  [SubscribeAndAssert]([{ key: 0, value: 'a' }], { error: 'error' })