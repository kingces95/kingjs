var { assert,
  '@kingjs': {
    '-rx': {
      '-static': { of, throws, never },
      '-sync': { Do, Then, SubscribeAndAssert }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var expected = [0, 1, 2, null]
of(0, 1, 2)
  [Do](
    o => assert.equal(expected.shift(), o), 
    () => assert.equal(expected.shift(), null),
    assert.fail
  )
  [SubscribeAndAssert]([0, 1, 2])
assert.ok(!expected.length)

var expected = [ 'error' ]
throws('error')
  [Do](
    assert.fail,
    assert.fail,
    e => assert.equal(expected.shift(), e)
  )
  [SubscribeAndAssert](null, { error: 'error' })
assert.ok(!expected.length)

var cancel = of()
  [Do]()
  [Then](never())
  [SubscribeAndAssert](null, { unfinished: true })
cancel()
