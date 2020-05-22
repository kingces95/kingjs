var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { create }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

// minimalist
var empty = create(() => undefined)
empty[SubscribeAndAssert](null, { unfinished: true })

// subscribed
var subscribed = false
var never = create(() => { subscribed = true })
never[SubscribeAndAssert](null, { unfinished: true })
assert.ok(subscribed)

// cancel
var canceled = false
var resource = create(() => () => canceled = true)
var cancel = resource[SubscribeAndAssert](null, { unfinished: true })
assert.ok(!canceled)
cancel()
assert.ok(canceled)

// empty
var empty = create(o => { o[Complete]() })
empty[SubscribeAndAssert]()

// zero
var zero = create(o => { o[Next](0); o[Complete]() })
zero[SubscribeAndAssert]([0])

// throws
var throws = create(o => { o[Error]('error') })
throws[SubscribeAndAssert](null, { error: 'error' })

// bad implementation
var bad = create(o => { throw 'error' })
assert.throws(() => bad[Subscribe]())

// sync
var sync = create(o => { o[Complete]() }, { assertAsync: true })
assert.throws(() => sync[Subscribe]())