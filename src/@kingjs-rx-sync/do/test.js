var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': {
      '-sync': { Do, SubscribeAndAssert,
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

var expected = [0, 1, 2, null]
of(0, 1, 2)
  [Do](
    o => assert.equal(expected.shift(), o), 
    () => assert.equal(expected.shift(), null),
    assert.fail,
    assert.fail, // does not intercept Subscribed
  )
  [SubscribeAndAssert]([0, 1, 2])
assert.ok(!expected.length)

never()
  [Do]()
  [SubscribeAndAssert](null, { terminate: true })

var cancel
of(0)
  [Do](
    o => { assert.equal(o, 0); cancel() }, 
    assert.fail,
    assert.fail,
  )
  [SubscribeAndAssert](null, { abandon: o => cancel = o })

var cancel
of()
  [Do](
    assert.fail,
    o => cancel(), 
    assert.fail,
  )
  [SubscribeAndAssert](null, { abandon: o => cancel = o })

var cancel
throws('error')
  [Do](
    assert.fail,
    assert.fail,
    e => { assert.equal(e, 'error'); cancel() }
  )
  [SubscribeAndAssert](null, { abandon: o => cancel = o })
