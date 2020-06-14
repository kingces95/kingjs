var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert, 
      '-static': { create }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }

process.nextTick(async () => {

  // next
  var once = create(function*(o) { o[Next](0); yield; o[Complete]() })
  await once[SubscribeAndAssert]([0])

  // complete
  var empty = create(function*(o) { o[Complete]() })
  await empty[SubscribeAndAssert]()

  // error
  var throws = create(function*(o) { o[Error]('error') })
  await throws[SubscribeAndAssert](null, { error: 'error' })

  // terminate
  var term = create(function*(o) { o[Next](0); yield; o[Complete]() })
  await term[SubscribeAndAssert]([0], { terminate: true })

  // do not hang if asked to sleep forever; test cancel polling
  var never = create(function*(o) { o[Next](0); yield Number.MAX_VALUE })
  await never[SubscribeAndAssert]([0], { terminate: true })

  // do not synchronously emit if asked to sleep for 0ms; always yield between emits
  var zeroForever = create(function*(o) { while(true) { o[Next](0); yield } })
  zeroForever[SubscribeAndAssert]([0], { terminate: true })
})