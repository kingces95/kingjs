var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': {
      '-sync': { Do, Then, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
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

var expected = [-1, 0, 1, 2, null]
of(0, 1, 2)
  [Do](
    o => assert.equal(expected.shift(), o), 
    () => assert.equal(expected.shift(), null),
    assert.fail,
    o => { assert(o); assert.equal(expected.shift(), -1) }
  )
  [SubscribeAndAssert]([0, 1, 2])
assert.ok(!expected.length)

var expected = [-1]
of(0, 1, 2)
  [Do](
    assert.fail,
    assert.fail,
    assert.fail,
    o => { o(); assert.equal(expected.shift(), -1) }
  )
  [Subscribe](assert.fail, assert.fail, assert.fail)
assert.ok(!expected.length)

never()
  [Do]()
  [SubscribeAndAssert](null, { terminate: true })