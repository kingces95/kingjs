var { assert,
  '@kingjs': {
    '-rx': {
      '-static': { never },
      '-sync': { Do, Then, SubscribeAndAssert,
        '-static': { of, throws },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

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

  var cancel = await of()
    [Do]()
    [Then](never())
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()
})
