var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx-static': { timer },
  },
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var result = []

  // prove values are returned in different clock ticks
  process.nextTick(() => result.push('tick'))

  await new Promise(resolve => {
    timer()[Subscribe](assert.fail, () => {
      result.push('complete')
      resolve()
    })
  })

  assert.deepEqual(result, ['tick', 'complete'])
})

process.nextTick(async () => {
  var delay = 50
  var start = Date.now()
  var end

  await new Promise(resolve => {
    new timer(delay)[Subscribe](
      assert.fail,
      () => { 
        end = Date.now()
        resolve() 
      }
    )
  })

  assert(end - start >= delay)
})