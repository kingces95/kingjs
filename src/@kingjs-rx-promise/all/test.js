var { assert,
  '@kingjs': {
    '-rx': { 
      '-static': { counter },
      '-promise': { All },
      '-async': { Take,
        '-static': { empty, throws }
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var result = await counter(3)
    [All]()
  assert.deepEqual([0, 1, 2], result)

  var result = await empty()
    [All]()
  assert.deepEqual([], result)

  try {
    await throws('error')
      [All]()
  } catch(e) {
    assert.equal(e, 'error')
  }
})