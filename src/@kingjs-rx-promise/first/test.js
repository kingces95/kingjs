var { assert,
  '@kingjs': {
    '-rx': {
      '-promise': { First },
      '-async-static': {  throws, empty },
      '-static': { clock }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var value = await clock()[First]()
  assert(value == 0)

  var value = await empty()[First]()
  assert(value === undefined)
  
  try { 
    await throws('error')[First]()
  } catch(e) { 
    assert.equal(e, 'error')
  }
})