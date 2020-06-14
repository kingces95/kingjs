var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete, Error },
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { create }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var cancelled = false
function cancel() { cancelled = true }

// empty
var empty = create(o => { 
  o[Subscribed](cancel)
  o[Complete]()
}, { name: 'empty' })
empty[SubscribeAndAssert]()
assert.ok(!cancelled)

// zero
var zero = create(o => { 
  o[Subscribed](cancel)
  o[Next](0)
  o[Complete]()
})
zero[SubscribeAndAssert]([0])
assert.ok(!cancelled)

// throws
var throws = create(o => { 
  o[Subscribed](cancel)
  o[Error]('error')
})
throws[SubscribeAndAssert](null, { error: 'error' })
assert.ok(!cancelled)

// cancel
var resource = create(o => { 
  o[Subscribed](cancel) 
  o[Next](0)
  if (!cancelled)
    o[Next](1)
})
resource[SubscribeAndAssert]([0], { terminate: true })
assert.ok(cancelled)