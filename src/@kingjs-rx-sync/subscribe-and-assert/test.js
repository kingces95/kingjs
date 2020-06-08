var { assert,
  '@kingjs': {
    IObserver: { Complete, Error },
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { create, createInitialized }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

// empty (fails to initialize)
var empty = create(o => { o[Complete]() })
assert.throws(() => empty[SubscribeAndAssert]())

// never (fails to accept)
var never = createInitialized(o => { })
assert.throws(() => never[SubscribeAndAssert]())

// throws (unexpected error)
var throws = createInitialized(o => { o[Error]('error') })
assert.throws(() => throws[SubscribeAndAssert]())