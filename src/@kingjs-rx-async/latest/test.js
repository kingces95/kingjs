var {
  '@kingjs': {
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert,
      '-static': { never, clock },
      '-async': { Latest, Take },
      '-sync': { Then, 
        '-static': { of, throws }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  // delay first result by enough to make it stale
  await clock(50)
    [Take](2)
    [Latest](async o => {
      if (o == 0) await sleep(75) 
      return o 
    })
    [SubscribeAndAssert]([1])
    
  // delay first result but not by enough to make it stale
  await clock(50)
    [Take](2)
    [Latest](async o => {
      if (o == 0) await sleep(25) 
      return o 
    })
    [SubscribeAndAssert]([0, 1])

  // synchronous complete
  await of()
    [Latest]()
    [SubscribeAndAssert](null)

  // asynchronous complete; complete blocks waiting for last emission
  await of(0)
    [Latest](async o => { 
      await sleep(100) 
      return o 
    })
    [SubscribeAndAssert]([0])

  // synchronous error
  await throws('error')
    [Latest]()
    [SubscribeAndAssert](null, { error: 'error' })

  // asynchronous error does not wait for last emission
  await of(0)
    [Then](throws('error'))
    [Latest](async o => { 
      await sleep(100) 
      return o 
    })
    [SubscribeAndAssert](null, { error: 'error' })

  // synchronous cancel
  var cancel0 = await never()
    [Latest]()
    [SubscribeAndAssert](null, { unfinished: true })
  cancel0()

  // synchronous self cancel
  var cancel1 = await of(0)
    [Latest](async o => { 
      cancel1(); 
      return o 
    })
    [SubscribeAndAssert](null, { unfinished: true })

  // asynchronous self cancel
  var cancel2 = await clock(50)
    [Take](3)
    [Latest](async o => { 
      if (o == 0) { await sleep(25) }
      if (o == 1) { await sleep(100) }
      if (o == 2) { cancel2() } 
      return o
    })
    [SubscribeAndAssert]([0], { unfinished: true })
    
  // asynchronous cancel
  var cancel4 = await new Promise(async accept => {
    var cancel3 = await clock(50)
    [Take](3)
    [Latest](async o => { 
      if (o == 0) { await sleep(10) }
      if (o == 1) { accept(cancel3); await sleep(100) }
      return o
    })
    [SubscribeAndAssert]([0], { unfinished: true })
  })
  cancel4()

  // synchronous callback error
  await of(0)
    [Latest](() => { throw 'error' })
    [SubscribeAndAssert](null, { error: 'error' })
})