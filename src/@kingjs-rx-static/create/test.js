var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert, 
      '-static': { create }
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
  await empty[SubscribeAndAssert](null, { unfinished: true })

  // subscribed
  var subscribed = false
  var noop = create(function*() { subscribed = true })
  var cancel = await noop[SubscribeAndAssert](null, { unfinished: true })
  await sleep()
  assert.ok(subscribed)
  cancel()

  // do not hang if asked to sleep forever; test cancel polling
  var never = create(function*() { yield Number.MAX_VALUE })
  var cancel = await never[SubscribeAndAssert](null, { unfinished: true })
  cancel()

  // do not synchronously emit if asked to sleep for 0ms; always yield between emits
  var zeroForever = create(function*(o) { while(true) { o[Next](0); yield } })
  var cancel = await zeroForever[SubscribeAndAssert]([0], { unfinished: true })
  cancel()
})