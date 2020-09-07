var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete, Error },
    '-promise': { sleep },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }
var PollMs = 20
var DefaultTimeout = 50000

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
async function subscribeAndAssert(expected, options = { }) {
  if (!expected)
    expected = [ ]

  var { 
    async, 
    error, 
    terminate,
    asyncTerminate,
    abandon, 
    log,
    timeout = DefaultTimeout,
    delay = 0,
  } = options

  // abandon is terminate without the `cancel` call
  if (abandon)
    terminate = true

  if (asyncTerminate)
    terminate = true

  var start = Date.now()
  var eventsExpected = true
  var accepted = false

  function completeOrError() {
    assert.ok(eventsExpected)
    eventsExpected = false
    assert.ok(!terminate)
    assert.ok(!expected.length)
  }

  function tryCancel(cancel) {
    assert(cancel)
    
    if (expected.length) 
      return false

    eventsExpected = false
    if (asyncTerminate)
      setImmediate(cancel)
    else
      cancel()
    return true
  }

  var test = async accept => {
    var initialized = false

    var cancel = this[Subscribe]({
      [Subscribed]() {
        assert(!initialized)
        initialized = true
        
        var syncCancel = arguments[0]
        if (abandon) {
          if (abandon instanceof Function)
            abandon(syncCancel)
          syncCancel = Noop
        }

        // async observables must yield before their first observation
        if (!async)
          cancel = syncCancel
      },
      [Next](o) {
        assert.ok(eventsExpected)
        assert.ok(cancel)
  
        if (log)
          console.log(o)

        assert.ok(Date.now() - start >= delay)
        start = Date.now()

        assert.deepEqual(o, expected.shift())
        if (terminate && tryCancel(cancel))
          accept()
      }, 
      [Complete]() {
        assert.ok(cancel)
        completeOrError()
        assert.ok(error === undefined)
        assert.ok(Date.now() - start >= delay)
        accept()
      },
      [Error](o) {
        assert.ok(cancel)
        completeOrError()
        assert.ok(error !== undefined)
        assert.equal(o, error)
        accept()
      }
    })

    assert.ok(cancel instanceof Function)
    assert.ok(initialized)

    while (expected[0] instanceof Function) {
      var action = expected.shift()
      var promise = action()

      assert(!(promise instanceof Promise) || async)
      if (async)
        await promise
    }
    
    if (eventsExpected && terminate && tryCancel(cancel))
      accept()
  }

  var start = Date.now()
  process.nextTick(async () => {
    while (Date.now() - start < timeout && !accepted)
      await sleep(PollMs)
    assert.ok(accepted)
  })

  if (async) {
    await new Promise(accept => test(accept))
    accepted = true
    return
  }

  test(() => accepted = true)
  assert.ok(accepted)
}

module[ExportInterfaceExtension](IObservable, subscribeAndAssert)