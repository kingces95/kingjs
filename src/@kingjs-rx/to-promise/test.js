var { assert,
  '@kingjs': {
    '-rx': { ToPromise,
      '-static': { clock, throws, empty }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var value = await clock()[ToPromise]()
  assert(value == 0)

  var value = await empty()[ToPromise]()
  assert(value === undefined)
  
  try { 
    await throws('error')[ToPromise]()
  } catch(e) { 
    assert.equal(e, 'error')
  }
})