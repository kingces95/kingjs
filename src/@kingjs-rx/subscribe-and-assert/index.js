var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete, Error },
    '-promise': { sleep },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }
var PollMs = 20
var DefaultTimeout = 100000

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
function subscribeAndAssert(expected, options = { }) {
  if (!expected)
    expected = [ ]

  var { 
    synchronous, 
    error, 
    terminate,
    asyncTerminate,
    abandon, 
    timeout = DefaultTimeout,
    delay = 0 
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

  var test = accept => {
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
        if (synchronous)
          cancel = syncCancel
      },
      [Next](o) {
        assert.ok(eventsExpected)
        assert.ok(cancel)
  
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
    
    if (eventsExpected && terminate && tryCancel(cancel))
      accept()
  }

  if (synchronous) {
    test(() => accepted = true)
    assert.ok(accepted)
    return
  }

  var start = Date.now()
  process.nextTick(async () => {
    while (Date.now() - start < timeout && !accepted)
      await sleep(PollMs)
    assert.ok(accepted)
  })

  return new Promise(test).then(() => accepted = true)
}

module[ExportExtension](IObservable, subscribeAndAssert)