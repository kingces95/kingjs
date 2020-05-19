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

  // cancel
  var never = create(function*(o) { while(true) { o[Next](0); yield } })
  var cancel = await never[SubscribeAndAssert](null, { unfinished: true })
  cancel()
  await sleep()

  // once
  var once = create(function*(o) { while(true) { o[Next](0); yield } })
  var cancel = await once[SubscribeAndAssert]([0], { unfinished: true })
  cancel()
  await sleep()

  // empty
  var empty = create(function*(o) { o[Complete]() })
  await empty[SubscribeAndAssert]()

  // zero
  var zero = create(function*(o) { o[Next](0); o[Complete]() })
  await zero[SubscribeAndAssert]([0])

  // throws
  var throws = create(function*(o) { o[Error]('error') })
  var error = await throws[SubscribeAndAssert](null, { error: 'error' })
  assert.equal('error', error)
})