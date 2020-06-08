var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Initialize, Next, Complete, Error },
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { create }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }

// auto abort
var subscribed = false
var never = create(() => { subscribed = true }, Noop)
never[SubscribeAndAssert](null, { abort: true })
assert.ok(!subscribed)

// manual abort
var subscribed = false
var never = create(o => { subscribed = true; o[Initialize](Noop); return Noop })
never[SubscribeAndAssert](null, { terminate: true })
assert.ok(subscribed)

// cancel
var cancelled = false
var resource = create(o => o[Next](0), () => cancelled = true)
resource[SubscribeAndAssert]([0], { terminate: true })
assert.ok(cancelled)

// empty
var empty = create(o => { o[Complete]() }, assert.fail)
empty[SubscribeAndAssert]()

// zero
var zero = create(o => { o[Next](0); o[Complete]() }, assert.fail)
zero[SubscribeAndAssert]([0])

// throws
var throws = create(o => { o[Error]('error') }, assert.fail)
throws[SubscribeAndAssert](null, { error: 'error' })

// bad implementation
var bad = create(o => { throw 'error' }, () => null)
assert.throws(() => bad[Subscribe]())

// bad patterns
assert.throws(() => create(o => { o[Next]() })[Subscribe]())
assert.throws(() => create(o => { o[Complete]() })[Subscribe]())
assert.throws(() => create(o => { o[Error]() })[Subscribe]())
assert.throws(() => create(o => { o[Complete](); o[Next]() })[Subscribe]())
assert.throws(() => create(o => { o[Complete](); o[Complete]() })[Subscribe]())
assert.throws(() => create(o => { o[Complete](); o[Error]() })[Subscribe]())
assert.throws(() => create(o => { o[Error](); o[Next]() })[Subscribe]({ [Error]() { } }))
assert.throws(() => create(o => { o[Error](); o[Complete]() })[Subscribe]({ [Error]() { } }))
assert.throws(() => create(o => { o[Error](); o[Error]() })[Subscribe]({ [Error]() { } }))