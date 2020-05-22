var { assert,
  '@kingjs': {
    '-rx': { ToArray, Take,
      '-static': { clock, empty, throws }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var result = await clock()
    [Take](3)
    [ToArray]()
  assert.deepEqual([0, 1, 2], result)

  var result = await empty()
    [ToArray]()
  assert.deepEqual([], result)

  try {
    await throws('error')
      [ToArray]()
  } catch(e) {
    assert.equal(e, 'error')
  }
})