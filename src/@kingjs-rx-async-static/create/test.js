var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert, 
      '-async-static': { create }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  // next
  var once = create(function*(o) { o[Next](0); o[Complete]() })
  await once[SubscribeAndAssert]([0])

  // complete
  var empty = create(function*(o) { o[Complete]() })
  await empty[SubscribeAndAssert]()

  // error
  var throws = create(function*(o) { o[Error]('error') })
  var error = await throws[SubscribeAndAssert](null, { error: 'error' })
  assert.equal('error', error)

  // minimalist
  var empty = create(function*() { })
  await empty[SubscribeAndAssert](null, { terminate: true })

  // minimalist
  var empty = create(function*(o, cancel) { cancel(); yield; o[Next](0) })
  await empty[SubscribeAndAssert](null, { terminate: true })

  // subscribed
  var subscribed = false
  var noop = create(function*() { subscribed = true })
  var cancel = await noop[SubscribeAndAssert](null, { terminate: true })
  await sleep()
  assert.ok(subscribed)
  cancel()

  // always yield between emits
  var zeroForever = create(function*(o) { while(true) { o[Next](0); yield } })
  var cancel = await zeroForever[SubscribeAndAssert]([0], { terminate: true })
  cancel()
})