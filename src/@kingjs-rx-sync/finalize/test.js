var { assert,
  '@kingjs': {
    '-rx': {
      '-sync': { Finalize, Then, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var expected = [null]
of(0, 1, 2)
  [Finalize](() => assert.equal(expected.shift(), null))
  [SubscribeAndAssert]([0, 1, 2])
assert.ok(!expected.length)

var expected = [ 'error' ]
throws('error')
  [Finalize](e => assert.equal(expected.shift(), e))
  [SubscribeAndAssert](null, { error: 'error' })
assert.ok(!expected.length)

never()
  [Finalize]()
  [SubscribeAndAssert](null, { terminate: true })
