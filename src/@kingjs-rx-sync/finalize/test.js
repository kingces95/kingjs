var { assert,
  '@kingjs': {
    '-rx': {
      '-static': { never },
      '-sync': { Finalize, Then, SubscribeAndAssert,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var expected = [null]
of(0, 1, 2)
  [Finalize](
    () => assert.equal(expected.shift(), null)
  )
  [SubscribeAndAssert]([0, 1, 2])
assert.ok(!expected.length)

var expected = [ 'error' ]
throws('error')
  [Finalize](e => assert.equal(expected.shift(), e))
  [SubscribeAndAssert](null, { error: 'error' })
assert.ok(!expected.length)

var cancel = of()
  [Finalize]()
  [Then](never())
  [SubscribeAndAssert](null, { unfinished: true })
cancel()
